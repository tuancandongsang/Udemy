import * as express from 'express';
import * as WebSocket from "ws";
import { HttpError, HttpStatusCodes, HttpParamValidators } from '../lib/http';
import { AccountingNS } from './accounting';
import { ContextNS } from '../ext/ctx';
import { UserAuthNS } from '../auth/auth';
import { GetAuthData, NewAuthMiddleware } from '../auth/auth.api.middleware';
import { format, endOfDay, startOfDay } from 'date-fns';
import { ExportExcel, removeVietnameseTones } from '../lib/export_excel';
import { OrgNS } from '../org/org';
import { ComputeRevuene , DATA_FORM, GetRoleMiddleware } from './accounting.api.middleware';

function getTimeRange(params: any): AccountingNS.QueryTransactionParams {
    const min = params.start_date? startOfDay(new Date(params.start_date as string)).getTime() : startOfDay(Date.now()).getTime();
    const max = params.end_date? endOfDay(new Date(params.end_date as string)).getTime() : endOfDay(Date.now()).getTime();
    let query: AccountingNS.QueryTransactionParams = {
        ctime : [min, max]
    };
    params.user_id? query.create_by = params.user_id : query;
    return query;
}

export function NewAccountingAPI(
    userAuthBLL: UserAuthNS.BLL,
    accountingBLL: AccountingNS.BLL,
    orgBLL: OrgNS.BLL
) { 
    const router = express.Router();
    const transaction_type = Object.values(AccountingNS.TransactionType);
    const book_status = Object.values(AccountingNS.BookStatus);

    router.post("/book/create", async (req, res) => {
        const params: AccountingNS.CreateBook = {
            name: HttpParamValidators.MustBeString(req.body, 'name')
        }
        const ctx = ContextNS.New();
        const book = await accountingBLL.CreateBook(ctx, params);
        res.json(book);
    })

    router.get("/book/list", async (req, res) => {
        const status = HttpParamValidators.MustBeOneOf(req.query, 'status', book_status);
        const docs = await accountingBLL.ListBook(status);
        res.json(docs);
    });

    router.post("/book/update", async (req, res) => {
        const id = req.body.id as string;
        const params: AccountingNS.UpdateBook = {
            name: HttpParamValidators.MustBeString(req.body, 'name'),
            status: HttpParamValidators.MustBeOneOf(req.body, 'status', book_status)
        }
        const ctx = ContextNS.New();
        await accountingBLL.UpdateBook(ctx, id, params);
        res.json(1);
    })

    router.get("/transaction/export-excel", async (req, res) => {
        const query = getTimeRange(req.query);
        const ctx = ContextNS.New();
        const docs = await accountingBLL.ReportByTransaction(ctx, query);
        const user = await orgBLL.GetUser(query.create_by);
        const space_cell = "";
        const title = [space_cell, space_cell, space_cell, `BẢNG KÊ THU CHI`];
        const end_date = [`Đến : ${format(query.ctime[1], "dd/MM/yyyy")}`];
        const start_date = [space_cell ,`Từ : ${format(query.ctime[0], "dd/MM/yyyy")}`,...end_date];
        const header = [title, start_date ];
        const revuene = await ComputeRevuene(docs);
        const file_name = `${removeVietnameseTones(user.full_name)}-${format(query.ctime[0], "dd/MM/yyyy")}-${format(query.ctime[1], "dd/MM/yyyy")}`;
        const signature = {
            [DATA_FORM.full_name] : `${user.full_name}`
        }
        revuene.data.push(signature);
        return ExportExcel(req, res, revuene.data, header, user.full_name, file_name);
    })

    router.use(NewAuthMiddleware(userAuthBLL));
    router.post("/transaction/create", async (req, res) => {
        const ref = HttpParamValidators.MustBeString(req.body, 'ref');
        if (ref !== "order" && ref !== "retail") {
            throw new HttpError("ref must be [order, retail]", 400);
        }
        const session = GetAuthData(req);
        const create_by = session.user_id;
        const params: AccountingNS.CreateTransaction = {
            ref: ref,
            ref_id: HttpParamValidators.MustBeString(req.body, 'ref_id'),
            book_id: HttpParamValidators.MustBeString(req.body, 'book_id'),
            create_by,
            amount: req.body.amount,
            type: HttpParamValidators.MustBeOneOf(req.body, 'type', transaction_type),
            note: HttpParamValidators.MustBeString(req.body, 'note'),
            isHidden : false
        };
        req.body.reason ? params.reason = req.body.reason : "";
        const ctx = ContextNS.New();
        const doc = await accountingBLL.CreateTransaction(ctx, params);
        res.json(doc);
    });

    router.post("/transaction/create_many", async (req, res) => {
        let params : Array<AccountingNS.CreateTransaction> = req.body;
        if (params.length < 1) {
            return res.json([]);
        }
        let data : Array<AccountingNS.CreateTransaction> = [];
        params.forEach(p => {
            HttpParamValidators.MustBeString(p, 'ref');
            if (p.ref !== "order" && p.ref !== "retail") {
                throw new HttpError("ref must be [order, retail]", 400);
            }
            HttpParamValidators.MustBeString(p, 'ref_id');
            HttpParamValidators.MustBeString(p, 'book_id');
            HttpParamValidators.MustBeOneOf(p, 'type', transaction_type);
            HttpParamValidators.MustBeString(p, 'note');
            const session = GetAuthData(req);
            p.create_by = session.user_id;
            if (!data.some(d => d.ref_id === p.ref_id)) {
                data.push(p);
            }
        })
        const ctx = ContextNS.New();
        const docs = await accountingBLL.CreateManyTransactions(ctx, data);
        return res.json(docs);
    });

    router.get("/transaction/list", async (req, res) => {
        const query = getTimeRange(req.query);
        const ctx = ContextNS.New();
        const isCheck = await GetRoleMiddleware(req, orgBLL);
        const docs = await accountingBLL.ListTransaction(ctx, query);
        if (isCheck) {
            return res.json({
                count: docs.length,
                records: docs,
            });
        }
        const filter_docs = docs.filter(d => !d.isHidden).map(obj => {
            delete obj.isHidden;
            return obj;
        });
        return res.json({
            count: filter_docs.length,
            records: filter_docs
        })
    });

    router.get("/transaction/origin/list", async (req, res) => {
        const query = getTimeRange(req.query);
        const doc = await accountingBLL.ListOriginTransaction(query)
        res.json(doc);
    });

    router.get("/transaction/get", async (req, res) => {
        const id = HttpParamValidators.MustBeString(req.query, "id", 6);
        const doc = await accountingBLL.GetTransaction(id);
        res.json(doc);
    });

    router.post("/transaction/update", async (req,res) => {
        const ctx = ContextNS.New();
        const id = HttpParamValidators.MustBeString(req.body, "id", 6);
        const status = HttpParamValidators.MustBeOneOf(req.body, "status", [true, false]);
        const isCheck = await GetRoleMiddleware(req, orgBLL);
        if (isCheck) {
            const doc = await accountingBLL.UpdateTransaction(ctx, id, status);
            return res.json(doc);
        }
        return res.status(HttpStatusCodes.NotFound).json("user role not allow full access")
    })

    return router;
}