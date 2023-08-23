import { AccountingNS } from './accounting';
import { ContextNS } from '../ext/ctx';
import { OrderNS } from '../order/order';
import { RetailNS } from '../retail/retail';
import { OrgNS } from '../org/org';
import { JobNS } from '../job/job';
import { CustomerNS } from '../customer/customer';
import rand from "../lib/rand";
import { InventoryNS } from '../inventory/inventory';
import { ServiceNS } from '../service/service';

export class AccountingBLLBase implements AccountingNS.BLL {
    constructor(
        private dal: AccountingNS.DAL,
        private contextBLL: ContextNS.BLL,
        private orderBLL: OrderNS.BLL,
        private retailBLL: RetailNS.BLL,
        private orgBLL: OrgNS.BLL,
        private jobBLL: JobNS.BLL,
        private customerBLL: CustomerNS.BLL,
        private inventoryBLL: InventoryNS.BLL,
        private serviceBLL: ServiceNS.BLL
    ) { }

    async init() { }

    async ListBook(status: AccountingNS.BookStatus) {
        const book = this.dal.ListBook(status);
        return book;
    }

    async GetBook(ctx: ContextNS.Context, id: string) {
        const book = await this.dal.GetBook(ctx, id);
        if (!book) {
            throw AccountingNS.Errors.ErrBookNotFound;
        }
        return book;
    }


    async CreateBook(ctx: ContextNS.Context, params: AccountingNS.CreateBook) {
        const now = Date.now();
        const status = AccountingNS.BookStatus.Inactive;
        const book: AccountingNS.Book = {
            id: rand.uppercase(8),
            name: params.name,
            status: status,
            total: 0,
            ctime: now,
            mtime: now,
        }
        await this.dal.CreateBook(ctx, book);
        return book;
    }

    async UpdateBook(ctx: ContextNS.Context, id: string, params: AccountingNS.UpdateBook) {
        const book = await this.GetBook(ctx, id);
        book.name = params.name;
        book.status = params.status;
        await this.dal.UpdateBook(ctx, book);
    }

    async ListTransaction(ctx: ContextNS.Context, query: AccountingNS.QueryTransactionParams) {
        const docs = await this.dal.ListTransaction(query);
        const order_ids = await Promise.all(docs.map(el => el.ref_id));
        const orders = order_ids.filter((el, index) => order_ids.indexOf(el) === index);
        const transactions = orders.map(ref_id => {
            const trans = docs.find(el => el.ref_id === ref_id);
            return trans;
        })
        const view_transactions = await Promise.all(transactions.map(async transaction => {
            let order = {} as any;
            let job_step = {} as JobNS.Step;
            if (transaction.ref == "order") {
                order = await this.orderBLL.ViewOrder(ctx, transaction.ref_id);
                job_step = await this.jobBLL.GetStep(ctx, order.ref_id);
                delete job_step["location"];
            }
            if (transaction.ref == "retail") {
                order = await this.retailBLL.GetOrder(ctx, transaction.ref_id);
            }
            const view_transaction: AccountingNS.ViewTransaction = {
                ...transaction,
                order,
                job_step
            }
            return view_transaction;
        }))
        return view_transactions;
    }

    async GetTransaction(id: string) {
        const transaction = await this.dal.GetTransaction(id);
        if (!transaction) {
            throw AccountingNS.Errors.ErrBookNotFound;
        }
        return transaction;
    }

    private async unsafeCreateOneTransaction(tx: ContextNS.Context, params: AccountingNS.CreateTransaction) {
        if (params.amount < 0) {
            throw AccountingNS.Errors.ErrAmountMustBePositive;
        }
        return this.contextBLL.RunTransaction(tx, async (ctx) => {
            const now = Date.now();
            const book = await this.GetBook(ctx, params.book_id);
            const transaction: AccountingNS.Transaction = {
                id: rand.alphabet(8),
                ref: params.ref,
                ref_id: params.ref_id,
                create_by: params.create_by,
                book_id: params.book_id,
                amount: params.amount,
                type: params.type,
                note: params.note,
                isHidden: params.isHidden,
                ctime: now,
            };
            if (params.reason) transaction.reason = params.reason;
            await this.dal.CreatTransaction(ctx, transaction);
            if (transaction.ref === "order") {
                const order_id = transaction.ref_id;
                const order = await this.orderBLL.ViewOrder(ctx, order_id);
                if (order.status === OrderNS.Status.New) {
                    await this.orderBLL.PayOrder(ctx, order_id, {
                        ref_paid: "accounting",
                        ref_paid_id: transaction.id,
                    });
                } else {
                    throw AccountingNS.Errors.ErrOrderHasPaid
                }
                if (params.amount === order.total) {
                    const total = book.total + params.amount;
                    await this.dal.UpdateBookTotal(ctx, book.id, total);
                }
                else {
                    throw AccountingNS.Errors.ErrOrderPriceAndTransactionAmount;
                }
            } else if (transaction.ref === "retail") {
                const order_id = transaction.ref_id;
                const order = await this.retailBLL.GetOrder(ctx, order_id);
                if (order.status === RetailNS.Status.New) {
                    await this.retailBLL.PayOrder(ctx, order_id, {
                        ref_paid: "accounting",
                        ref_paid_id: transaction.id,
                    });
                } 
                else {
                    throw AccountingNS.Errors.ErrOrderHasPaid
                }
                if (params.amount === order.total) {
                    const total = book.total + params.amount;
                    await this.dal.UpdateBookTotal(ctx, book.id, total);
                }
                else {
                    throw AccountingNS.Errors.ErrOrderPriceAndTransactionAmount;
                }
            } else {
                throw AccountingNS.Errors.ErrTransactionRefNotAllowed;
            }
            return transaction;
        });
    }

    async CreateTransaction(ctx: ContextNS.Context, params: AccountingNS.CreateTransaction) {
        return this.contextBLL.RunTransaction(ctx, async (ctx) => {
            const transaction = await this.unsafeCreateOneTransaction(ctx, params);
            return transaction;
        })
    }

    async CreateManyTransactions(ctx: ContextNS.Context, params: AccountingNS.CreateTransaction[]) {
        return this.contextBLL.RunTransaction(ctx, async (ctx) => {
            const transactions = await Promise.all(params.map(async p => {
                const transaction = await this.unsafeCreateOneTransaction(ctx, p);
                return transaction;
            }));
            return transactions;
        })
    }

    async ViewTransaction(ctx: ContextNS.Context, id: string) {
        const transaction = await this.dal.GetTransaction(id);
        let order = {} as any;
        if (transaction.ref === "order") {
            order = await this.orderBLL.GetOrder(ctx, transaction.ref_id);
        }
        if (transaction.ref === "retail") {
            order = await this.retailBLL.GetOrder(ctx, transaction.ref_id);
        }
        const res: AccountingNS.ViewTransaction = {
            ...transaction,
            order,
        }
        return res;
    }

    async ReportByTransaction(ctx: ContextNS.Context, query: AccountingNS.QueryTransactionParams) {
        const docs = await this.dal.ReportByTransaction(ctx, query);
        const view_records = await Promise.all(docs.map(async d => {
            const view_customer = await this.customerBLL.ViewCustomer(d.id);
            return {
                ...d,
                customer: view_customer,
            }
        }))
        return view_records;
    }

    async UpdateTransaction(ctx: ContextNS.Context, id: string, status: boolean) {
        const transaction = await this.dal.GetTransaction(id);
        transaction.isHidden = status;
        await this.dal.UpdateTransaction(ctx, transaction);
        const view_transaction = await this.ViewTransaction(ctx, id);
        return view_transaction;
    }

    async ListOriginTransaction(query) {
        const transactions = await this.dal.ListTransaction(query);
        return transactions
    }
}