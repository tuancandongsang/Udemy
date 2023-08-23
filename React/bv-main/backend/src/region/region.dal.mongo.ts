import { FromMongoData, MongoDB, ToMongoData, MongoCommon } from "../lib/mongodb";
import { RegionNS } from "./region";
const now = Date.now();
export class RegionDALMongo implements RegionNS.DAL {
    constructor (private db : MongoDB) { }

    async init() { }
    private col_region = this.db.collection("region");

    async ListRegion(query : RegionNS.QuerryRegionParams) {
        const $match = {$and : [{type : query.type}, {parent_id : query.parent_id}]};
        const docs = await this.col_region.aggregate([
            { $match }
        ]).toArray();
        return FromMongoData.Many<RegionNS.Region>(docs);
    }

    async GetRegion(id : string) {
        const doc = await this.col_region.findOne({id : id});
        return FromMongoData.One<RegionNS.Region>(doc);
    }

    async GetRegionByName(name : string) {
        const docs = await this.col_region.find({name}).toArray();
        return FromMongoData.Many<RegionNS.Region>(docs);
    }

    async CreateRegion(region : RegionNS.Region) {
        const doc = ToMongoData.One(region)
        await this.col_region.insertOne(doc);
    }
}