import { JobNS } from "./job";
import { ContextNS } from "../ext/ctx";
import { OrderNS } from "../order/order";
import { CustomerNS } from "../customer/customer";
import { LocationNS } from "../location/location";
import { format, differenceInYears } from "date-fns";
import { UploadNS } from "../upload/upload";
import { ServiceNS } from "../service/service";
import { SampleNS } from "../sample/sample";
export class JobBLLBase implements JobNS.BLL {
    constructor(
        private dal: JobNS.DAL,
        private contextBLL: ContextNS.BLL,
        private locationBLL: LocationNS.BLL,
        private customerBLL: CustomerNS.BLL,
        private serviceBLL: ServiceNS.BLL,
        private orderBLL: OrderNS.BLL,
        private uploadBLL: UploadNS.BLL
    ) { }

    async init() { }

    private async toViewStep(ctx: ContextNS.Context, step: JobNS.Step) {
        try {
            const order = await this.orderBLL.ViewOrder(ctx, step.order_id);
            const data_upload = await this.uploadBLL.ListData(step.id);
            const view_step: JobNS.ViewStep = {
                ...step,
                order,
                upload: data_upload
            };
            if (step.location_id) {
                view_step.location = await this.locationBLL.GetLocation(step.location_id);
            }
            return view_step;
        } catch (err) {
            console.log(`read step`, step, err);
            return null;
        }
    }

    async ViewListStep(ctx: ContextNS.Context, query: JobNS.QueryStepParams) {
        const steps = await this.dal.ListStep(ctx, query);
        let view_steps = [] as Array<JobNS.ViewStep>;
        if (query.customer_code) {
            view_steps = await Promise.all(steps.map(async step => {
                if (step.type != JobNS.StepType.Buy) {
                    return await this.toViewStep(ctx, step);
                }
            }));
            const steps_by_code = view_steps.filter(step => 
                step.status === JobNS.StepStatus.New && step.order.customer?.code === query.customer_code
            );
            return steps_by_code;
        } 
        view_steps = await Promise.all(steps.map(async step => await this.toViewStep(ctx, step)));
        return view_steps;
    }

    async SearchJobStep(ctx: ContextNS.Context, params: JobNS.QueryStepParams) {
        let view_steps = [] as Array<JobNS.ViewStep>;
        if (params.customer_code) {
            const customer = await this.customerBLL.GetCustomerByCode(params.customer_code);
            params.customer_code = customer.id;
            const steps = await Promise.all(await this.dal.SearchJobStep(ctx, params));
            view_steps = await Promise.all(steps.map(async step => await this.toViewStep(ctx, step)));
            return view_steps.filter(step => {
                if (step.type !== JobNS.StepType.Buy && [JobNS.StepStatus.Ready, JobNS.StepStatus.Running].includes(step.status)) {
                    return step;
                }
            });
        } 
        if (params.full_name) {
            const steps = await Promise.all(await this.dal.SearchJobStep(ctx, params));
            view_steps = await Promise.all(steps.map(async step => await this.toViewStep(ctx, step)));
            return view_steps.filter(step => {
                if (step.type !== JobNS.StepType.Buy && [JobNS.StepStatus.Ready, JobNS.StepStatus.Running].includes(step.status)) {
                    return step;
                }
            });
        }
        return view_steps;
    }   

    async GetJob(ctx: ContextNS.Context, id: string) {
        const job = await this.dal.GetJob(ctx, id);
        if (!job) {
            throw JobNS.Errors.ErrJobNotFound;
        }
        return job;
    }

    async ViewJob(ctx: ContextNS.Context, id: string) {
        const job = await this.GetJob(ctx, id);
        const steps = await this.dal.ListStep(ctx, { job_id: id });
        const view_steps = await Promise.all(
            steps.map(step => this.toViewStep(ctx, step))
        );
        const ref_value = await this.customerBLL.GetCustomer(job.ref_id);
        const res: JobNS.ViewJob = {
            ...job,
            ref_value,
            steps: view_steps
        };
        return res;
    }

    async GetStep(ctx: ContextNS.Context, id: string) {
        const job_step = await this.dal.GetStep(ctx, id);
        const view_step = await this.toViewStep(ctx, job_step);
        if (!job_step) {
            throw JobNS.Errors.ErrStepNotFound;
        }
        return view_step;
    }

    async AddStep(ctx: ContextNS.Context, job_id: string, step: JobNS.StepOptions) {
        return this.contextBLL.RunTransaction(ctx, async (ctx) => {
            let job = {} as JobNS.Job;
            if (!step.job_ref_id) {
                job = await this.GetJob(ctx, job_id);
                step.job_ref_id = job.ref_id;
            } else {
                job = await this.GetJob(ctx, job_id);
            }
            const now = Date.now();
            let order_items = step.items;
            const step_code = JobNS.Generator.NewJobStepCode();
            if (!step.order_type) {
                step.order_type = OrderNS.Type.Other;
            }
            let service_policy;
            if (job.args["service_policy_id"]) {
                service_policy = await this.serviceBLL.GetPolicy(job.args["service_policy_id"]);
                order_items = step.items.map(item => {
                    if (job.args["service_policy_id"]) {
                        Object.assign(item, { variant : { policy_id : job.args["service_policy_id"]}})
                        return item;
                    }
                    return item;
                })   
            }
            const order = await this.orderBLL.CreateOrder(ctx, {
                ref: "job_step",
                ref_id: JobNS.Generator.NewJobStepId(),
                items: order_items,
                code: step_code,
                type: step.order_type,
                customer_id: step.job_ref_id,
            });
            let service: ServiceNS.Service;
            if (step.location_id && step.type !== JobNS.StepType.Buy) {
                // verify location
                await this.locationBLL.GetLocation(step.location_id);
                service = await this.serviceBLL.GetService(order_items[0].ref_id);
            }
            let results = [];
            if (step.type === JobNS.StepType.Test) {
                if (service.type == ServiceNS.Type.Test) {
                    for (let i in SampleNS.Device) {
                        results.push({ device: SampleNS.Device[i] })
                    }
                    await Promise.all(order_items.map(async item => {
                        const service = await this.serviceBLL.GetService(item.ref_id);
                        const steps = await this.serviceBLL.ListStep({service_id : item.ref_id});
                        const customer = await this.customerBLL.GetCustomer(order.customer_id);
                        const now = Date.now();
                        const birthday = new Date(customer.birthday).getTime();
                        const customer_age = differenceInYears(now, birthday);
                        let obj = {};
                        steps.length == 0
                        ? obj = { device : SampleNS.Device.Other, [service.name] : null }
                        : steps.forEach(step => {
                            let new_obj = {};
                            if (step.option?.gender == customer.gender) {
                                if (step.option.age?.[0] <= customer_age && customer_age <= step.option.age?.[1]) {
                                    new_obj = { device : step.device, [step.name] : {value : "", unit : step.unit, range : step.value }};
                                }
                                if (step.option.age == undefined) {
                                    new_obj = { device : step.device, [step.name] : {value : "", unit : step.unit, range : step.value }};
                                }
                            } 
                            if (step.option == null) {
                                new_obj = { device : step.device, [step.name] : {value : "", unit : step.unit, range : step.value }};
                            }
                            Object.assign(obj, new_obj);
                        })
                        results.forEach(r => {
                            if (r["device"] == obj["device"]) {
                                Object.assign(r, obj);
                            }
                        })
                    }))
                }
            }
            const job_step: JobNS.Step = {
                id: order.ref_id,
                job_ref_id: step.job_ref_id,
                job_id: job_id,
                code: step_code,
                type: step.type,
                order_id: order.id,
                status: JobNS.StepStatus.New,
                location_id: step.location_id,
                created_by: step.created_by,
                results: results,
                ctime: now,
                mtime: now,
            }
            await this.dal.CreateStep(ctx, job_step);
            return job_step;
        });
    }

    async CreateJob(ctx: ContextNS.Context, params: JobNS.CreateJobParams) {
        if (params.ref === 'customer') {
            await this.customerBLL.GetCustomer(params.ref_id);
        } else {
            throw JobNS.Errors.ErrJobRefNotAllowed;
        }
        return this.contextBLL.RunTransaction(ctx, async (ctx) => {
            const now = Date.now();
            const date = format(now, 'yyyy-MM-dd');
            const count = await this.dal.CountJob(ctx, {
                date
            });
            const date_pos = `${count + 1}`;
            const job: JobNS.Job = {
                id: JobNS.Generator.NewJobId(),
                date,
                date_pos,
                ref: params.ref,
                ref_id: params.ref_id,
                created_by: params.created_by,
                ctime: now,
                mtime: now,
                args: params.args,
                state: {},
            }
            await this.dal.CreateJob(ctx, job);
            for (const step of params.steps) {
                step.job_ref_id = job.ref_id;
                await this.AddStep(ctx, job.id, step);
            }
            return job;
        });
    }

    async SetJobState(ctx: ContextNS.Context, id: string, params: JobNS.SetJobStateParams) {
        const job = await this.GetJob(ctx, id);
        job.state = Object.assign(job.state || {}, params.state);
        job.modified_by = params.modified_by;
        job.mtime = Date.now();
        await this.dal.UpdateJob(ctx, job);
        return job;
    }

    async FinishStep(ctx: ContextNS.Context, id: string, params: JobNS.FinishStepParams) {
        return this.contextBLL.RunTransaction(ctx, async (ctx) => {
            const job_step = await this.GetStep(ctx, id);
            if (params.results) {
                job_step.results = params.results;
                job_step.modified_by = params.modified_by;
            }
            if (job_step.status !== JobNS.StepStatus.Done) {
                job_step.status = JobNS.StepStatus.Done;
            }
            job_step.mtime = Date.now();
            await this.dal.UpdateStep(ctx, job_step);
            const order_id = job_step.order_id;
            const order = await this.orderBLL.GetOrder(ctx, order_id);
            if (order.status !== OrderNS.Status.Done) {
                await this.orderBLL.FinishOrder(ctx, order_id, {
                    ref_done: "job_step",
                    ref_done_id: job_step.id
                });
            }
        });
    }

    async UpdateStep(ctx: ContextNS.Context, id: string, params: JobNS.UpdateStepParams) {
        return this.contextBLL.RunTransaction(ctx, async (ctx) => {
            const job_step = await this.GetStep(ctx, id);
            if (params.status) {
                if ([JobNS.StepStatus.Cancel, JobNS.StepStatus.Done].includes(job_step.status)) {
                    throw JobNS.Errors.ErrCancelStep;
                } else {
                    job_step.status = params.status;
                }
            }
            if (params.modified_by) {
                job_step.modified_by = params.modified_by;
            }
            if (params.results) {
                job_step.results = params.results;
            }
            job_step.mtime = Date.now();
            await this.dal.UpdateStep(ctx, job_step);
        });
    }

    async ListJob(ctx: ContextNS.Context, query: JobNS.QueryJobParams) {
        const docs = await this.dal.ListJob(ctx, query);
        const view_jobs = await Promise.all(
            docs.map(doc => this.ViewJob(ctx, doc.id))
        )
        return view_jobs;
    }

    async CountJobStep(ctx: ContextNS.Context) {
        const locations = await this.locationBLL.ListLocation();
        const filter_locations = locations.filter(l => !["QT", "LT"].includes(l.type));
        const query : JobNS.QueryStepParams = {
            status : [JobNS.StepStatus.Ready, JobNS.StepStatus.Running]
        }
        const docs = await Promise.all(filter_locations.map(async l => {
            query.location_id = l.id;
            const job_step = await this.ViewListStep(ctx, query);
            const customers = [...new Set(job_step.map(el => el["order"]["customer"]["id"]))];
            return {
                name : l.name,
                count : customers.length
            }
        }))
        return docs;
    }
}



