import { AccountingNS } from './accounting';
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes, MongoCommon } from "../lib/mongodb";
import { ContextNS } from '../ext/ctx';
import { OrderNS } from "../order/order";
export class AccountingDALMongo implements AccountingNS.DAL {
    constructor(
        private db: MongoDB
    ) { }

    async init() {}

    private col_accounting_book = this.db.collection("accounting_book");
    private col_accounting_transaction = this.db.collection("accounting_transaction");

    async ListBook(status: AccountingNS.BookStatus) {
        const docs = await this.col_accounting_book.find({status: status}).toArray();
        return FromMongoData.Many<AccountingNS.Book>(docs); 
    }

    async GetBook(ctx: ContextNS.Context, id: string) {
        const session = MongoCommon.Session(ctx);
        const doc = await this.col_accounting_book.findOne({ _id: id }, { session });
        return FromMongoData.One<AccountingNS.Book>(doc);
    }

    async CreateBook(ctx: ContextNS.Context, book: AccountingNS.Book) {
        const session = MongoCommon.Session(ctx);
        const doc = ToMongoData.One(book);
        await this.col_accounting_book.insertOne(doc, { session });
    }

    async UpdateBook(ctx: ContextNS.Context, book: AccountingNS.Book) {
        const session = MongoCommon.Session(ctx);
        const doc = ToMongoData.One(book);
        await this.col_accounting_book.updateOne({ _id: book.id }, { $set: doc }, { session });
    }

    async ListTransaction(query : AccountingNS.QueryTransactionParams) {
        let $match = {} as any;
        if (query.create_by) {
            $match = {$and : [{ctime : {$gte:query.ctime[0] , $lte:query.ctime[1]}}, {create_by : query.create_by}]};
        } else {
            $match = {ctime : {$gte:query.ctime[0] , $lte:query.ctime[1]}};
        }
        const $sort = { ctime : 1 }
        const docs = await this.col_accounting_transaction.aggregate([
            { $match },
            { $sort }
        ]).toArray();
        return FromMongoData.Many<AccountingNS.Transaction>(docs);
    }

    async ReportByTransaction(ctx: ContextNS.Context, query: AccountingNS.QueryTransactionParams) {
        let $match = {} as any;
        if (query.create_by) {
            $match = {$and : [{ctime : {$gte:query.ctime[0] , $lte:query.ctime[1]}}, {create_by : query.create_by}]};
        } else {
            $match = {ctime : {$gte:query.ctime[0] , $lte:query.ctime[1]}};
        }
        const $lookup_order = { 
            from : "order",
            localField : "ref_id",
            foreignField : "_id",
            as : "order"
        }
        const $lookup_job_step = {
            from : "job_step",
            localField : "order.ref_id",
            foreignField : "_id",
            as : "job_step"
        }
        const $group = {
            _id : { 
                customer_id : "$job_step.job_ref_id",
                account_type : "$type"
            },
            steps : { $push : {
                id : "$job_step._id",
                type : "$job_step.type",
                status : "$job_step.status",
                service : { $first : "$job_step.order.items" },
                amount : "$order.total",
                ctime : "$ctime"
            }}
        }
        const $project_record = {
            _id : "$_id.customer_id",
            accounting_type : "$_id.account_type",
            job_steps: {
                $map : {
                    input : "$steps",
                    as : "step",
                    in : {
                        id : "$$step.id",
                        type : "$$step.type",
                        status : "$$step.status",
                        service_type : "$$step.service.ref_value.type",
                        amount : "$$step.amount",
                        ctime : "$$step.ctime"
                    }
                }
            }, 
            ctime : { $first : "$steps.ctime" }
        }
        const $addFields = { total : { $sum : "$job_steps.amount" } };
        const $sort = { ctime : 1 };
        const docs = await this.col_accounting_transaction.aggregate([
            { $match },
            { $sort },
            { $lookup : $lookup_order },
            { $unwind : "$order" },
            { $lookup : $lookup_job_step },
            { $unwind : "$job_step" },
            { $group },
            { $project : $project_record },
            { $addFields },
            { $sort }
        ]).toArray();
        return FromMongoData.Many<AccountingNS.Records>(docs);
    }

    async GetTransaction(id: string) {
        const doc = await this.col_accounting_transaction.findOne({ _id: id });
        return FromMongoData.One<AccountingNS.Transaction>(doc);
    }

    async CreatTransaction(ctx: ContextNS.Context, transaction: AccountingNS.Transaction) {
        const session = MongoCommon.Session(ctx);
        const doc = ToMongoData.One(transaction);
        await this.col_accounting_transaction.insertOne(doc, { session });
    }

    async UpdateBookTotal(ctx: ContextNS.Context, id: string, total: number) {
        const session = MongoCommon.Session(ctx);
        await this.col_accounting_book.updateOne({ _id: id }, { $set: { total } }, { session });
    }

    async UpdateTransaction(ctx: ContextNS.Context, transaction: AccountingNS.Transaction) {
        try {
            const doc = ToMongoData.One(transaction);
            await this.col_accounting_transaction.updateOne({_id: doc._id}, {$set: doc});
        } catch (error) {
            throw error;
        }
    }
}