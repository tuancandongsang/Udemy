import { InventoryNS } from './inventory';
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes, MongoCommon } from "../lib/mongodb";
import { ContextNS } from '../ext/ctx';
export class InventoryDALMongo implements InventoryNS.DAL {
    constructor(private db: MongoDB) { }
    async init() {
        this.col_inventory_lot.createIndex({ code: 1, warehouse_id: 1 }, { unique: true });
    }

    private col_inventory_warehouse = this.db.collection("inventory_warehouse");
    private col_inventory_lot = this.db.collection("inventory_lot");
    private col_inventory_transaction = this.db.collection("inventory_transaction");

    //WAREHOUSE
    async ListWareHouse() {
        const docs = await this.col_inventory_warehouse.find().toArray();
        return FromMongoData.Many<InventoryNS.WareHouse>(docs);
    }
    async GetWareHouse(id: string) {
        const doc = await this.col_inventory_warehouse.findOne({ _id: id });
        return FromMongoData.One<InventoryNS.WareHouse>(doc);
    }
    async CreateWareHouse(warehouse: InventoryNS.WareHouse) {
        const doc = ToMongoData.One(warehouse);
        await this.col_inventory_warehouse.insertOne(doc);
    }
    async UpdateWareHouse(warehouse: InventoryNS.WareHouse) {
        const doc
         = ToMongoData.One(warehouse);
        await this.col_inventory_warehouse.updateOne({ _id: warehouse.id }, { $set: doc });
    }

    //TRANSACTION
    async ListTransaction(query: InventoryNS.QueryTransaction) {
        const filter = {} as any;
        if (query.warehouse_id) {
            filter.warehouse_id = query.warehouse_id;
        }
        if (query.lot_id) {
            filter.lot_id = query.lot_id;
        }
        if (query.ref_id) {
            filter.ref_id = query.ref_id;
        }
        if (query.product_id) {
            filter.product_id = query.product_id;
        }
        if (query.ctime) {
            filter.ctime = {$gte:query.ctime[0] , $lte:query.ctime[1]};
        }
        const docs = await this.col_inventory_transaction.find(filter).toArray();
        return FromMongoData.Many<InventoryNS.Transaction>(docs);
    }

    async CountTransaction(query: InventoryNS.QueryTransaction) {``
        const $match = { type : InventoryNS.TransactionType.LotRemain };
        const $project = { 
            _id : 1,
            [`${query.type}_id`] : 1 
        };
        const docs = await this.col_inventory_transaction.aggregate([
            { $match },
            { $project },
            { $count : "total" }
        ]).toArray();
        const n = docs[0].total;
        return +n;
    }

    async ReportTransaction(query: InventoryNS.QueryTransaction) {
        const $match = { ctime : { $gte : query.ctime[0] , $lte : query.ctime[1] }}
        const $lookup_warehouse = {
            from : "inventory_warehouse",
            localField : "warehouse_id",
            foreignField : "_id",
            as : "warehouse"
        }
        const $lookup_lot = {
            from : "inventory_lot",
            localField : "lot_id",
            foreignField : "_id",
            as : "lot"
        }
        let $lookup_data = {} as any;
        let $unwind_data = {} as any;
        let $project_data = {} as any;
        let $lookup_lots = {} as any;
        if (query.type === InventoryNS.Type.PRODUCT) {
            $lookup_data = {
                from : InventoryNS.Type.PRODUCT,
                localField : `${InventoryNS.Type.PRODUCT}_id`,
                foreignField : "_id",
                as : InventoryNS.Type.PRODUCT
            }
            $unwind_data = `$${InventoryNS.Type.PRODUCT}`
            $lookup_lots = {
                from : "inventory_lot",
                localField : `${InventoryNS.Type.PRODUCT}_id`,
                foreignField : "ref_id",
                as : "lots"
            }
            $project_data = {
                _id : "$created_by",
                // ref : 0,
                // ref_id : 0,
                type : 1,
                amount : 1,
                name : `$${InventoryNS.Type.PRODUCT}.name`,
                type_name : InventoryNS.Type.PRODUCT,
                lot_code : "$lot.code",
                warehouse_name : "$warehouse.name",
                remain : { $sum : "$lots.remain"},
                ctime : 1
            }    
        }
        if (query.type === InventoryNS.Type.CONSUMABLE) {
            $lookup_data = {
                from : InventoryNS.Type.CONSUMABLE,
                localField : `${InventoryNS.Type.CONSUMABLE}_id`,
                foreignField : "_id",
                as : InventoryNS.Type.CONSUMABLE
            }
            $unwind_data = `$${InventoryNS.Type.CONSUMABLE}`;
            $lookup_lots = {
                from : "inventory_lot",
                localField : `${InventoryNS.Type.CONSUMABLE}_id`,
                foreignField : "ref_id",
                as : "lots"
            };
            $project_data = {
                _id : "$created_by",
                // ref : 0,
                // ref_id : 0,
                type : 1,
                amount : 1,
                name : `$${InventoryNS.Type.CONSUMABLE}.name`,
                type_name : InventoryNS.Type.CONSUMABLE,
                lot_code : "$lot.code",
                warehouse_name : "$warehouse.name",
                remain : { $sum : "$lots.remain"},
                ctime : 1
            }
        }
        const $sort = { ctime : 1 };
        const docs = await this.col_inventory_transaction.aggregate([
            { $match},
            { $lookup : $lookup_warehouse },
            { $unwind : "$warehouse" },
            { $lookup : $lookup_lot },
            { $unwind : "$lot" },
            { $lookup : $lookup_data },
            { $unwind : $unwind_data },
            { $lookup : $lookup_lots },
            { $project : $project_data },
            { $sort }
        ]).toArray();
        return FromMongoData.Many<InventoryNS.ReportTransaction>(docs);
    }

    async GetTransaction(id: string) {
        const doc = await this.col_inventory_transaction.findOne({ _id: id });
        return FromMongoData.One<InventoryNS.Transaction>(doc);
    }

    async CreateTransaction(ctx: ContextNS.Context, tranaction: InventoryNS.Transaction) {
        try {
            const session = MongoCommon.Session(ctx);
            const doc = ToMongoData.One(tranaction);
            await this.col_inventory_transaction.insertOne(doc, { session });
        } catch(e) {
            throw e;
        }
    }

    ///LOT
    async ListLot(query: InventoryNS.QueryTransaction) {
        const filter = {} as any;
        if (query.warehouse_id) {
            filter.warehouse_id = query.warehouse_id;
        }
        if (query.product_id) {
            filter.ref_id = query.product_id;
        }
        if (query.type) {
            filter.ref = query.type;
        }
        if (query.consumable_id) {
            filter.ref_id = query.consumable_id;
        }
        const docs = await this.col_inventory_lot.find(filter).sort({ctime : -1}).toArray();
        return FromMongoData.Many<InventoryNS.Lot>(docs);
    }

    async GetLot(ctx: ContextNS.Context, id: string) {
        const session = MongoCommon.Session(ctx);
        const doc = await this.col_inventory_lot.findOne({ _id: id }, { session });
        return FromMongoData.One<InventoryNS.Lot>(doc);
    }

    async CreateLot(ctx: ContextNS.Context, lot: InventoryNS.Lot) {
        try {
            const session = MongoCommon.Session(ctx);
            const doc = ToMongoData.One(lot);
            await this.col_inventory_lot.insertOne(doc, { session });
        } catch (err) {
            if (err.code === MongoErrorCodes.Duplicate) {
                throw InventoryNS.Errors.ErrLotCodeExisted;
            } else {
                throw err;
            }
        }
    }

    async UpdateLot(ctx: ContextNS.Context, lot: InventoryNS.Lot) {
        const session = MongoCommon.Session(ctx);
        const doc = ToMongoData.One(lot);
        await this.col_inventory_lot.updateOne({ _id: lot.id }, { $set: doc }, { session });
    }

    async GetAllLot() {
        const docs = await this.col_inventory_lot.find().toArray();
        return FromMongoData.Many<InventoryNS.Lot>(docs);
    }
}