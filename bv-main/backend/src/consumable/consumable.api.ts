import * as express from "express";
import { HttpParamValidators } from "../lib/http";
import { ConsumableNS } from "./consumable";

export function NewConsumableAPI(
    consumableBLL: ConsumableNS.BLL
) {
    const router = express.Router();

    router.get("/list", async (req,res) => {
        const docs = await consumableBLL.ListConsumable();
        res.json(docs);
    })

    router.get("/get", async (req,res) => {
        const id = HttpParamValidators.MustBeString(req.query, "id", 6);
        const doc = await consumableBLL.GetConsumable(id);
        res.json(doc);
    })

    router.post("/create", async (req,res) => {
        const params: ConsumableNS.CreateParamsConsumable = {
            name: HttpParamValidators.MustBeString(req.body, "name", 2),
            producer_id: HttpParamValidators.MustBeString(req.body, "producer_id", 6),
            unit: HttpParamValidators.MustBeString(req.body, "unit", 1)
        }
        params.note = req.body.note? req.body.note : "";
        const doc = await consumableBLL.CreateConsumable(params);
        res.json(doc);
    })

    return router;
}