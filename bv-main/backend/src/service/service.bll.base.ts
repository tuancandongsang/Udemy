import { FilterData } from '../common/filter_data_handlers';
import { ServiceNS } from './service';

export class ServiceBLLBase implements ServiceNS.BLL {
    constructor(
        private dal: ServiceNS.DAL,
    ) { }

    async init() { }

    async ListService(type? : string) {
        const docs : Array<ServiceNS.Service> = type ? await this.dal.ListService(type) : await this.dal.ListService();
        const services = FilterData<ServiceNS.Service>(docs);
        return services.sort((a,b) => a.code.localeCompare(b.code));
    }

    async GetService(id: string) {
        const service = await this.dal.GetService(id);
        if (!service) {
            throw ServiceNS.Errors.ErrServiceNotFound;
        }
        return service;
    }

    async ViewService(id: string) {
        const service = await this.GetService(id);
        const steps = await this.ListStep({service_id : service.id});
        const view_service: ServiceNS.ViewService = {
            ...service,
            steps
        };
        return view_service;
    }

    async CreateService(params: ServiceNS.CreateServiceParams) {
        const now = Date.now();
        const service: ServiceNS.Service = {
            id: ServiceNS.Generator.NewServiceId(),
            code: params.code,
            name: params.name,
            price: params.price,
            origin_price: params.origin_price,
            type: params.type,
            consumable: params.consumable,
            ctime: now,
            mtime: now,
        }
        await this.dal.CreateService(service);
        return service;
    }

    async UpdateService(id: string, params: ServiceNS.UpdateServiceParams) {
        const doc = await this.GetService(id);
        const service = {...doc, ...params};
        await this.dal.UpdateService(service);
        return service;
    }

    async UpdatePriceDiscount(type : ServiceNS.Type, discount : number) {
        const services = await this.ListService();
        const docs = await Promise.all(services.map(async service => {
            if (service.type == type) {
                const price = (Math.ceil((service.origin_price * (1 - discount))*0.001)) * 1000;
                service.price = price;
                await this.dal.UpdateService(service);
            }
            return service;
        }));
        //update policy discount kl3d and kdv
        (await Promise.all(await this.ListPolicy())).forEach(async p => {
            if (["KL3D", "KDV"].includes(p.code)) {
                p.code === "KL3D" && type === ServiceNS.Type.Exam ? p.discount[type] : p.discount[type] = discount;
                await this.dal.UpdatePolicy(p);
            }
        })
        return docs;
    }

    async DeleteService(id: string) {
        const service = await this.GetService(id);
        service.dtime = Date.now();
        await this.dal.UpdateService(service);
        return service;
    }

    //--------------------------
    async ListPolicy() {
        const docs = await this.dal.ListPolicy();
        const price_policy = FilterData<ServiceNS.Policy>(docs);
        return price_policy;
    }

    async GetPolicy(id: string) {
        const price_policy = await this.dal.GetPolicy(id);
        if (!price_policy) {
            throw ServiceNS.Errors.ErrServicePolicyNotFound;
        }
        return price_policy;
    }

    async CreatePolicy(params: ServiceNS.CreatePolicyParams) {
        const now = Date.now();
        const price_policy: ServiceNS.Policy = {
            id: ServiceNS.Generator.NewPolicyId(),
            code: params.code,
            name: params.name,
            discount: params.discount,
            ctime: now,
            mtime: now
        }
        await this.dal.CreatePolicy(price_policy);
        return price_policy;
    }

    async UpdatePolicy(id: string, params: ServiceNS.UpdatePolicyParams) {
        const price_policy = await this.GetPolicy(id);
        const doc = {...price_policy, ...params};
        await this.dal.UpdatePolicy(doc);
    }

    async DeletePolicy(id: string) {
        const price_policy = await this.GetPolicy(id);
        price_policy.dtime = Date.now();
        await this.dal.UpdatePolicy(price_policy);
        return price_policy;
    }

    private async getStep(id: string) {
        const step = await this.dal.GetStep(id);
        if (!step) {
            throw ServiceNS.Errors.ErrServiceStepNotFound;
        }
        return step;
    }

    async AddStep(params: ServiceNS.ArrayStepsParams) {
        const now = Date.now();
        const docs = Promise.all(params.steps.map(async el => {
            const step: ServiceNS.Step = {
                id: ServiceNS.Generator.NewServiceStepId(),
                service_id: params.service_id,
                name: el.name,
                unit: el.unit,
                value: el.value,
                device: el.device,
                option : el.option
            }
            await this.dal.CreateStep(step)
            return step;
        }))
        return docs;
    }

    async ListStep(filter : object) {
        const step = await this.dal.ListStep(filter);
        return step;
    }

    async UpdateStep(id: string, params: ServiceNS.UpdateStepParams) {
        const doc = await this.getStep(id);
        const step = {...doc,...params};
        await this.dal.UpdateStep(step);
    }

    async DeleteStep(id: string) {
        const step = await this.getStep(id);
        await this.dal.DeleteStep(id);
        return step;
    }

}
