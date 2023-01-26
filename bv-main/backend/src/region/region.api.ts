import * as express from "express";
import { HttpParamValidators } from "../lib/http";
import { RegionNS } from "./region";

export function NewAPIRegion(
    regionBLL : RegionNS.BLL
) {
    const router = express.Router();
    const type_regions = Object.values(RegionNS.Type);
    router.get("/region/list" , async (req,res) => {
        const querry : RegionNS.QuerryRegionParams = {
            type: HttpParamValidators.MustBeOneOf(req.query, "type" , type_regions),
            parent_id: HttpParamValidators.MustBeString(req.query, "parent_id")
        }
        const docs = await regionBLL.ListRegion(querry);
        res.json(docs);
    })

    router.get("/region/get" , async (req,res) => {
        let doc: RegionNS.Region | Array<RegionNS.Region>;
        if (req.query.id) {
            const id = req.query.id as string;
            doc = await regionBLL.GetRegion(id);
        }
        if (req.query.name) {
            const name = req.query.name as string;
            doc = await regionBLL.GetRegionByName(name);
        }
        res.json(doc);
    })

    router.post('/region/create' , async (req,res) => {
        const params : RegionNS.CreateRegionParams = {
            zip_code: HttpParamValidators.MustBeString(req.body, "zip_code"),
            name: HttpParamValidators.MustBeString(req.body, "name"),
            type: HttpParamValidators.MustBeOneOf(req.body, "type" , type_regions),
            parent_id: HttpParamValidators.MustBeString(req.body, "parent_id")
        }
        const doc = await regionBLL.CreateRegion(params);
        res.json(doc);
    })

    return router;
}