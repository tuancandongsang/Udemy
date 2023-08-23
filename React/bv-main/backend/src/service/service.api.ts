import * as express from 'express';
import { HttpParamValidators } from '../lib/http';
import { ServiceNS } from './service';

export function NewServiceAPI(
    serviceBLL: ServiceNS.BLL
) {
    const app = express();
    const service_types = Object.values(ServiceNS.Type);

    app.post("/service/create", async (req, res) => {
        const params: ServiceNS.CreateServiceParams = {
            code: HttpParamValidators.MustBeString(req.body, 'code'),
            name: HttpParamValidators.MustBeString(req.body, 'name'),
            price: req.body.price,
            origin_price: req.body.origin_price,
            type: HttpParamValidators.MustBeOneOf(req.body, 'type', service_types)
        };
        if (req.body.consumable && Array.isArray(req.body.consumable)) {
            req.body.consumable.forEach(c => HttpParamValidators.MustBeString(c, "id", 6));
            params.consumable = req.body.consumable;
        }
        const service = await serviceBLL.CreateService(params);
        res.json(service);
    });

    app.get("/service/list", async (req, res) => {
        let docs : Array<ServiceNS.Service>;
        if (req.query.type) {
            const type = HttpParamValidators.MustBeOneOf(req.query, "type", service_types);
            docs = await serviceBLL.ListService(type);
        } else {
            docs = await serviceBLL.ListService();
        }
        res.json(docs);
    });

    app.get("/service/get", async (req, res) => {
        const id = req.query.id as string;
        const doc = await serviceBLL.ViewService(id);
        res.json(doc);
    });

    app.post("/service/update", async (req, res) => {
        const id = req.body.id;
        const params: ServiceNS.UpdateServiceParams = req.body;
        if (req.body.consumable && Array.isArray(req.body.consumable)) {
            req.body.consumable.forEach(c => HttpParamValidators.MustBeString(c, "id", 6));
            params.consumable = req.body.consumable;
        }
        const doc = await serviceBLL.UpdateService(id, params);
        res.json(doc);
    });

    app.post("/service/discount", async (req,res) => {
        const discount = req.body.discount as number * 0.01;
        const type = HttpParamValidators.MustBeOneOf(req.body, 'type', service_types);
        const docs = await serviceBLL.UpdatePriceDiscount(type, discount);
        res.json(docs);
    })

    app.post("/service/delete", async (req, res) => {
        const id = req.body.id;
        const doc = await serviceBLL.DeleteService(id);
        res.json(doc);
    })

    app.post("/policy/create", async (req, res) => {
        const code = HttpParamValidators.MustBeString(req.body, 'code');
        const name = HttpParamValidators.MustBeString(req.body, 'name');
        const discount = req.body.discount;
        for (let i in ServiceNS.Type) {
            if (!discount.hasOwnProperty(ServiceNS.Type[i])) {
                discount[ServiceNS.Type[i]] = +0;
            }
        }
        const params: ServiceNS.CreatePolicyParams = {
            code,
            name,
            discount
        }
        const policy = await serviceBLL.CreatePolicy(params);
        res.json(policy);
    });

    app.get("/policy/list", async (req, res) => {
        const docs = await serviceBLL.ListPolicy();
        res.json(docs);
    });

    app.get("/policy/get", async (req, res) => {
        const id = (req.query as any).id;
        const doc = await serviceBLL.GetPolicy(id);
        res.json(doc);
    });

    app.post("/policy/update", async (req, res) => {
        const id = req.body.id as string;
        const params: ServiceNS.UpdatePolicyParams = req.body;
        await serviceBLL.UpdatePolicy(id, params);
        res.json(1);
    });

    app.post("/policy/delete", async (req, res) => {
        const id = req.body.id;
        const doc = await serviceBLL.DeletePolicy(id);
        res.json(doc)
    });

    app.get("/step/list", async (req, res) => {
        let filter = {} as any;
        if (req.query.service_id) {
            filter.service_id = req.query.service_id as string;
        }
        const docs = await serviceBLL.ListStep(filter);
        res.json(docs);
    })

    app.post("/step/create", async (req, res) => {
        const service_id = HttpParamValidators.MustBeString(req.body, 'service_id');
        const steps = req.body.steps as Array<ServiceNS.CreateStepParams>;
        const params = {
            service_id,
            steps
        }
        const docs = await serviceBLL.AddStep(params);
        res.json(docs.length);
    })

    app.post("/step/update", async (req, res) => {
        const id = req.body.id;
        const service_id = HttpParamValidators.MustBeString(req.body, 'service_id');
        const params: ServiceNS.UpdateStepParams = {
            service_id,
            ...req.body
        }
        await serviceBLL.UpdateStep(id, params);
        res.json(1);
    });

    app.post("/step/delete", async (req, res) => {
        const id = req.body.id;
        await serviceBLL.DeleteStep(id);
        res.json(1);
    });

    return app;
}

