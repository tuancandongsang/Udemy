import { Db } from "mongodb";
import { FromMongoData, MongoErrorCodes, MongoModel, ToMongoData } from "../lib/mongodb";
import { ConsumableNS } from "./consumable";

export class ConsumableDALMongo implements ConsumableNS.DAL {
    constructor (
        private db : Db
    ) { }
    
    private col_consumable = this.db.collection<MongoModel<ConsumableNS.Consumable>>("consumable");

    async init() { }

    async GetConsumable(id: string) {
        const doc = await this.col_consumable.findOne({_id : id});
        return FromMongoData.One<ConsumableNS.Consumable>(doc);
    }

    async ListConsumable() {
        const docs = await this.col_consumable.find().toArray();
        return FromMongoData.Many<ConsumableNS.Consumable>(docs);
    }

    async CreateConsumable(consumable: ConsumableNS.Consumable) {
        const doc = ToMongoData.One(consumable);
        try {
            await this.col_consumable.insertOne(doc)
        } catch(e) {
            if (e.codes === MongoErrorCodes.Duplicate) {
                throw ConsumableNS.Errors.ErrConsumableExist;
            } else {
                throw e;
            }
        }
    }
}