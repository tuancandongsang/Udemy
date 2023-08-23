import * as express from "express";
import * as WebSocket from "ws";
import { UserAuthNS } from "../auth/auth";
import { GetAuthData, NewAuthMiddleware } from "../auth/auth.api.middleware";
import { ContextNS } from "../ext/ctx";
import { HttpParamValidators } from "../lib/http";
import { SampleNS } from "./sample";

export function NewSampleAI(
    sampleBLL : SampleNS.BLL,
    userAuthBLL : UserAuthNS.BLL,
) {
    const router = express.Router();
    const devices = Object.values(SampleNS.Device);

    router.get("/get", async (req,res) => {
        const id = req.query.id as string;
        const ctx = ContextNS.New();
        const doc = await sampleBLL.GetSample(ctx, id);
        res.json(doc);
    })

    router.get("/list", async (req,res) => {
        let docs = [] as SampleNS.Sample[];
        if (req.query.device) {
            const device = req.query.device as string;
            docs = await sampleBLL.ListSampleByDevice(device);
        } else {
            docs = await sampleBLL.ListSample();
        }
        res.json({
            count : docs.length,
            docs
        });
    })
    
    router.post("/send_result", async (req,res) => {
        const id = req.body.id as string;
        const result = req.body.result;
        const ctx = ContextNS.New();
        const doc = await sampleBLL.PostResult(ctx, id, result);
        res.json(doc);
    })

    router.use(NewAuthMiddleware(userAuthBLL));
    router.post("/create", async (req,res) => {
        const params : SampleNS.CreateSampleParams = {
            order_id : req.body.order_id as string,
            created_by : GetAuthData(req).user_id
        }
        if (req.body.device) {
            params.device = HttpParamValidators.MustBeOneOf(req.body, "device", devices);
        }
        const docs = await sampleBLL.CreateSample(params);
        res.json(docs);
    })
    
    return router;
}