import { ContextNS } from "../ext/ctx";
import { JobNS } from "../job/job";
import { OrderNS } from "../order/order";
import { OrgNS } from "../org/org";
import { ServiceNS } from "../service/service";
import { SampleNS } from "./sample";

export class SampleBLLBase implements SampleNS.BLL {
    constructor(
        private dal: SampleNS.DAL,
        private jobBLL: JobNS.BLL,
        private orderBLL: OrderNS.BLL,
        private orgBLL: OrgNS.BLL,
        private contextBLL: ContextNS.BLL
    ) { }

    async init() { }

    async GetSample(ctx: ContextNS.Context, id: string) {
        const doc = await this.dal.GetSample(ctx, id);
        if (!doc) {
            throw SampleNS.Errors.ErrSampleNotFound;
        }
        const order = await this.orderBLL.ViewOrder(ctx, doc.order_id);
        const customer = order.customer;
        delete customer["contacts"]; 
        if (doc.created_by) {
            const user = await this.orgBLL.GetUser(doc.created_by);
            return { ...doc, customer, user }
        }
        return { ...doc, customer};
    }

    async ListSample() {
        const filter = {} as any;
        const docs = await this.dal.ListSample(filter);
        return docs;
    }

    async ListSampleByDevice(device: string) {
        const filter = { device: device }
        const docs = await this.dal.ListSample(filter);
        return docs;
    }

    async CreateSample(params: SampleNS.CreateSampleParams) {
        if (params.order_id.trim().length == 0) {
            const sample: SampleNS.Sample = {
                id: SampleNS.Generator.NewSampleId(),
                order_id: "",
                created_by : params.created_by,
                status: "cancel",
                ctime: Date.now(),
                mtime: Date.now()
            }
            await this.dal.CreateSample(sample);
            return [sample];
        } else {
            const ctx = ContextNS.New();
            const order = await this.orderBLL.ViewOrder(ctx, params.order_id);
            const job_step = await this.jobBLL.GetStep(ctx, order.ref_id);
            let samples = [];
            if (!params.device) {
                let [BC2800, BS200E, UA66, Other, Test, Immune] = [[],[],[],[],[],[]];
                Promise.all(order.items.map(item => {
                    if (item.ref_value["steps"].length > 0 && item.quantity > 0) {
                        const device = item.ref_value["steps"][0].device;
                        console.log(device)
                        if (device == SampleNS.Device.BC2800) {
                            delete item.ref_value["steps"];
                            BC2800.push(item.ref_value);
                        } else if (device == SampleNS.Device.BS200E) {
                            delete item.ref_value["steps"];
                            BS200E.push(item.ref_value);
                        } else if (device == SampleNS.Device.UA66) {
                            delete item.ref_value["steps"];
                            UA66.push(item.ref_value);
                        } else if (device == SampleNS.Device.Test) {
                            delete item.ref_value["steps"];
                            Test.push(item.ref_value);
                        } else if (device == SampleNS.Device.Immune) {
                            delete item.ref_value["steps"];
                            Immune.push(item.ref_value);
                        } else if (device == SampleNS.Device.Other) {
                            delete item.ref_value["steps"];
                            Other.push(item.ref_value);
                        } else if (device == undefined) {
                            delete item.ref_value["steps"];
                            Other.push(item.ref_value);
                        }
                    } else {
                        delete item.ref_value["steps"];
                        Other.push(item.ref_value);
                    }
                }))
                for (let key of Object.keys(SampleNS.Device)) {
                    if (eval(key).length > 0) {
                        const sample: SampleNS.Sample = {
                            id: SampleNS.Generator.NewSampleId(),
                            order_id: params.order_id,
                            created_by : params.created_by,
                            services: eval(key),
                            device: SampleNS.Device[key],
                            status: "done",
                            ctime: Date.now(),
                            mtime: Date.now()
                        }
                        await this.dal.CreateSample(sample);
                        samples.push(sample);
                    }
                }
                samples.forEach(sample => {
                    job_step.results.forEach(result => {
                        if (sample["device"] == result["device"] && result["sample_id"] == undefined) {
                            result["sample_id"] = sample.id;
                            result["ctime"] = "";
                        }
                    })
                })
            } else {
                const samplesDevice = await this.ListSampleByDevice(params.device);
                let services : Array<ServiceNS.Service>;
                samplesDevice.forEach(s => {
                    if (s.order_id == params.order_id) {
                        services = [...s.services];
                    }
                })
                const sample: SampleNS.Sample = {
                    id: SampleNS.Generator.NewSampleId(),
                    order_id: params.order_id,
                    created_by : params.created_by,
                    services: services,
                    device: params.device,
                    status: "done",
                    ctime: Date.now(),
                    mtime: Date.now()
                }
                await this.dal.CreateSample(sample);
                samples.push(sample);
                [...job_step.results].forEach(result => {
                    if (sample.device == result["device"] ) {
                        let new_result = {...result};
                        for (let k in result) {
                            new_result[k] = "";
                        }
                        new_result["device"] = sample.device;
                        new_result["sample_id"] = sample.id;
                        new_result["ctime"] = "";
                        job_step.results.push(new_result);
                    }
                })
            }
            await this.jobBLL.UpdateStep(ctx, job_step.id, job_step);
            return samples;
        }
    }

    async PostResult(ctx: ContextNS.Context, id: string, result: object) {
        return this.contextBLL.RunTransaction(ctx, async (ctx) => {
            const doc = await this.GetSample(ctx, id);
            doc.result = result;
            doc.mtime = Date.now();
            let obj = {};
            for (let i in result) {
                obj[i] = result[i]
            }
            await this.dal.PostResult(ctx, doc);
            const order = await this.orderBLL.ViewOrder(ctx, doc.order_id);
            const job_step = await this.jobBLL.GetStep(ctx, order.ref_id);
            const results = await Promise.all(job_step.results.map(r => {
                if (r["sample_id"] === doc.id) {
                    if (r["device"] === result["device"]) {
                        delete result["device"];
                        r["ctime"] = result["ctime"];
                        Object.entries(result).forEach(array => {
                            if (r[array[0]]) {
                                if (array[1] && array[0] != "ctime") {
                                    r[array[0]]["value"] = array[1];
                                }
                            }
                        })
                    } else {
                        throw SampleNS.Errors.ErrMachineNotWorking;
                    }
                }
                return r;
            }))
            const params: JobNS.FinishStepParams = {
                modified_by: job_step.created_by,
                results: results,
            };
            await this.jobBLL.FinishStep(ctx, job_step.id, params);
            return doc;
        })
    }
}