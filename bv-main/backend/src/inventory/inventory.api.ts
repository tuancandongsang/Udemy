import * as express from 'express';
import { HttpError, HttpStatusCodes, HttpParamValidators } from '../lib/http';
import { InventoryNS } from './inventory';
import { UserAuthNS } from '../auth/auth';
import { ContextNS } from '../ext/ctx';
import { NewAuthMiddleware, GetAuthData } from '../auth/auth.api.middleware';
import { format, startOfDay, endOfDay } from 'date-fns';
import { DifferenceRevuene, ManageRevuene , MANAGE_FORM, StaffRevuene  } from './inventory.api.middleware';
import { ExcelPharmacyManage, removeVietnameseTones, ExcelPharmacyStaff, ExcelPharmacyDifference } from '../lib/export_excel';
import { OrgNS } from '../org/org';

// import * as Fuse from 'fuse.js';
const Fuse = require('fuse.js');

export const MODE_EXPORT = {
    MANAGE_DOCS: 'manage-docs',
    STAFF_DOCS: 'staff-docs',
    MANAGE_EXCEL: 'manage-excel',
    STAFF_EXCEL: 'staff-excel',
    DIFFERENCE_DOCS: 'difference-docs',
    DIFFERENCE_EXCEL: 'difference-excel'
}

export function ChangeKeysObjs(objArr: Array<object>, keyArr: Array<string>) {
    return objArr.map(obj => {
        const keyValues = Object.keys(obj).map((key, index) => {
            const newKey = keyArr[index];
            return { [newKey]:  obj[key]};
        });
        return Object.assign({}, ...keyValues);
    });
}

export function NewInventoryAPI(
    userAuthBLL: UserAuthNS.BLL,
    inventoryBLL: InventoryNS.BLL,
    orgBLL: OrgNS.BLL
) {
    const app = express();
    const types = Object.values(InventoryNS.Type);

    app.get("/transaction/report", async (req, res) => {
        let min = startOfDay(Date.now()).getTime();
        let max = endOfDay(Date.now()).getTime();
        if (req.query.start_date) {
            min = startOfDay(new Date(req.query.start_date as string)).getTime();
        }
        if (req.query.end_date) {
            max = endOfDay(new Date(req.query.end_date as string)).getTime();
        }
        const query: InventoryNS.QueryTransaction = { 
            ctime : [min , max]
        };

        const result = await Promise.all(await inventoryBLL.ListTransaction(query));
        const docs = result.filter(r => r.product);

        const space_cell = "";
        const title = [space_cell, space_cell, space_cell, space_cell, space_cell, `BẢNG KÊ THỐNG KÊ`];
        const end_date = [`Đến : ${format(query.ctime[1], "dd/MM/yyyy")}`];
        const start_date = [space_cell ,`Từ : ${format(query.ctime[0], "dd/MM/yyyy")}`, space_cell , ...end_date];
        const header = [title, start_date ];

        if(req.query.mode === MODE_EXPORT.MANAGE_EXCEL) {
            const file_name = `${removeVietnameseTones('Thống kê')}-${format(query.ctime[0], "dd/MM/yyyy")}-${format(query.ctime[1], "dd/MM/yyyy")}`;
            const revuene = await ManageRevuene(docs);
            //res.json(revuene);
            return ExcelPharmacyManage(req, res, revuene.data, header, 'Thong ke', file_name);
        } 
        if(req.query.mode === MODE_EXPORT.STAFF_EXCEL) {
            const user_id = HttpParamValidators.MustBeString(req.query, 'user_id');
            const revuene = await StaffRevuene(docs, user_id);
            const user = await orgBLL.GetUser(user_id);
            const file_name = `${removeVietnameseTones(user.full_name)}-${format(query.ctime[0], "dd/MM/yyyy")}-${format(query.ctime[1], "dd/MM/yyyy")}`;
            // const signature = {
            //     [DATA_FORM.full_name] : `${user.full_name}`
            // }
            // revuene.data.push(signature);
            // res.json(revuene)
            return ExcelPharmacyStaff(req, res, revuene.data, header, 'Thong ke', file_name);
        }
        if(req.query.mode === MODE_EXPORT.MANAGE_DOCS) {
            const revuene = await ManageRevuene(docs);
            const keyArr = ['index', 'name', 'unit', 'price', 'initial', 'initialAmount', 'export', 'exportAmount', 'import', 'importAmount', 'final', 'finalAmount'];
            const revueneDocs = revuene.data.map(obj => {
                const keyValues = Object.keys(obj).map((key, index) => {
                    const newKey = keyArr[index];
                    return { [newKey]:  obj[key]};
                });
                return Object.assign({}, ...keyValues);
            });
            res.json(revueneDocs);
        }
        if(req.query.mode === MODE_EXPORT.STAFF_DOCS) {
            const user_id = HttpParamValidators.MustBeString(req.query, 'user_id');
         
            const revuene = await StaffRevuene(docs, user_id);
            const keyArr = ['index', 'name', 'unit', 'price', 'order', 'orderAmount', 'retail', 'retailAmount', 'total', 'totalAmount', 'import', 'export'];
            const revueneDocs = revuene.data.map(obj => {
                const keyValues = Object.keys(obj).map((key, index) => {
                    const newKey = keyArr[index];
                    return { [newKey]:  obj[key]};
                });
                return Object.assign({}, ...keyValues);
            });
            res.json(revueneDocs);
        }
        if(req.query.mode === MODE_EXPORT.DIFFERENCE_EXCEL) {
            const file_name = `${removeVietnameseTones('Thống kê lợi')}-${format(query.ctime[0], "dd/MM/yyyy")}-${format(query.ctime[1], "dd/MM/yyyy")}`;
            const revuene = await DifferenceRevuene(docs);
           // res.json(revuene);
            return ExcelPharmacyDifference(req, res, revuene.data, header, 'Thong ke', file_name);
        }
        if(req.query.mode === MODE_EXPORT.DIFFERENCE_DOCS) {
            const revuene = await DifferenceRevuene(docs);
            const keyArr = ['index', 'name', 'unit', 'priceDifference', 'order', 'retail', 'export', 'total'];
            const revueneDocs = ChangeKeysObjs(revuene.data, keyArr);
            res.json(revueneDocs);
        }
    })

    //ADD WAREHOUSE
    app.post("/warehouse/create", async (req, res) => {
        const name = HttpParamValidators.MustBeString(req.body, 'name', 2);
        const params: InventoryNS.CreateWareHouseParams = {
            name,
        };
        const warehouse = await inventoryBLL.CreateWareHouse(params);
        res.json(warehouse);
    });
    //UPDATE WAREHOUSE
    app.post("/warehouse/update", async (req, res) => {
        const id = HttpParamValidators.MustBeString(req.body, 'id');
        const name = req.body.name;
        const params: InventoryNS.UpdateWareHouseParams = {
            name,
        };
        await inventoryBLL.UpdateWareHouse(id, params);
        res.json(1);
    });
    //LIST WAREHOUSE
    app.get("/warehouse/list", async (req, res) => {
        const docs = await inventoryBLL.ListWareHouse();
        res.json(docs);
    });
    //GET WAREHOUSE
    app.get("/warehouse/get", async (req, res) => {
        const doc = await inventoryBLL.GetWareHouse(req.query.id as string);
        res.json(doc);
    });

    //LIST TRANSACTION
    app.get("/transaction/list", async (req, res) => {
        let query: InventoryNS.QueryTransaction = {}
        if(req.query.warehouse_id) query.warehouse_id = req.query.warehouse_id as string;
        if(req.query.product_id) query.product_id = req.query.product_id as string;
        if(req.query.type) {
            query.type = HttpParamValidators.MustBeOneOf(req.query, "type", types)
        } else {
            query.type = InventoryNS.Type.PRODUCT;
        }
        if(req.query.lot_id) query.lot_id = req.query.lot_id as string; 
        if(req.query.start_date && req.query.end_date) {
            query.ctime = [
                startOfDay(new Date(req.query.start_date as string).getTime()).getTime(),
                endOfDay(new Date(req.query.end_date as string).getTime()).getTime()
            ]
        } else {
            query.ctime = [
                startOfDay(Date.now()).getTime(),
                endOfDay(Date.now()).getTime()
            ]
        }
        const docs = await inventoryBLL.ReportTransaction(query);
        //const n = await inventoryBLL.CountTransaction(query);
        res.json(docs)
    });

    //GET TRANSACTION
    app.get("/transaction/get", async (req, res) => {
        const doc = await inventoryBLL.GetTransaction(req.query.id as string);
        res.json(doc);
    });

    //-----------------------------
    app.use(NewAuthMiddleware(userAuthBLL));
    app.post("/lot/create", async (req, res) => {
        const code = HttpParamValidators.MustBeString(req.body, 'code');
        const warehouse_id = HttpParamValidators.MustBeString(req.body, 'warehouse_id');
        const ref = HttpParamValidators.MustBeOneOf(req.body, "ref", types);
        const ref_id = HttpParamValidators.MustBeString(req.body, 'ref_id');
        const created_by = GetAuthData(req).user_id;
        const total = req.body.total;
        const man_date = HttpParamValidators.MustBeString(req.body, 'man_date');
        const exp_date = HttpParamValidators.MustBeString(req.body, 'exp_date');
        const params: InventoryNS.CreateLotParams = {
            code,
            warehouse_id,
            ref,
            ref_id,
            total,
            man_date,
            exp_date,
            created_by
        };
        const ctx = ContextNS.New();
        const lot = await inventoryBLL.CreateLot(ctx, params);
        res.json(lot);
    });
    app.post("/lot/quantity", async (req, res) => {
        const lot_id = HttpParamValidators.MustBeString(req.body, 'id');
        const amount = req.body.amount; 
        const type = HttpParamValidators.MustBeOneOf(req.body, "type", Object.values(InventoryNS.TransactionType));
        const ctx = ContextNS.New();
        const params: InventoryNS.CreateTransactionParams = {
            amount,
            lot_id,
            ref: "lot",
            ref_id: lot_id,
            type: type,
        }
        await inventoryBLL.CreateManyTransaction(ctx, [params]);
        const lot = await inventoryBLL.GetLot(ctx, lot_id);
        res.json(lot);
    });
    app.post("/lot/update", async (req, res) => {
        const id = HttpParamValidators.MustBeString(req.query, 'id');
        const ctx = ContextNS.New();
        let params: InventoryNS.UpdateLotParams = {}
        if(req.body.exp_date) params.exp_date = HttpParamValidators.MustBeString(req.body, 'exp_date');
        if(req.body.man_date) params.man_date = HttpParamValidators.MustBeString(req.body, 'man_date');
        if(req.body.code) params.code = HttpParamValidators.MustBeString(req.body, 'code');
        await inventoryBLL.UpdateLot(ctx, id, params);
        res.json(1);
    });
    //LIST LOT
    app.get("/lot/list", async (req, res) => {
        const query: InventoryNS.QueryTransaction = {}
        if(req.query.warehouse_id) query.warehouse_id = req.query.warehouse_id as string;
        if(req.query.product_id) query.product_id = HttpParamValidators.MustBeString(req.query, "product_id", 6);
        if(req.query.type) query.type = HttpParamValidators.MustBeOneOf(req.query, "type", types);
        if(req.query.consumable_id) query.consumable_id = HttpParamValidators.MustBeString(req.query, "consumable_id", 6);
        const docs = await inventoryBLL.ListLot(query);
        res.json(docs);
    });
    //GET LOT
    app.get("/lot/get", async (req, res) => {
        const ctx = ContextNS.New();
        const doc = await inventoryBLL.GetLot(ctx, req.query.id as string);
        res.json(doc);
    });
    app.get("/lot/all", async (req, res) => {
        const docs = await inventoryBLL.GetAllLot();
        res.json(docs);
    })
     //GET SEARCH PRODUCT
    app.get("/search", async (req, res) => {
        const by = req.query.by as string;
        if(by === 'product'){
            const text = req.query.text as string;
            const docs = await inventoryBLL.SearchProduct();
            const options = {
                includeScore: true,
                keys: ['name','parts.name']
            }
            const fuse = new Fuse(docs, options)
            const result = fuse.search(text)
            res.json(result.slice(0,10));
        }
    });

    // ADD TRANSACTION
    app.post("/transaction/for_lot", async (req, res) => {
        const ctx = ContextNS.New();
        const lot_id = HttpParamValidators.MustBeString(req.body,'lot_id');
        const ref = "lot"
        const ref_id = lot_id;
        const amount = req.body.amount;
        const created_by = GetAuthData(req).user_id;
        if (isNaN(amount) || amount > 0 || amount !== Math.round(amount)) {
            throw new HttpError("transaction amount must be a negative integer", HttpStatusCodes.BadRequest);
        }
        const params: InventoryNS.CreateTransactionParams = {
            type: InventoryNS.TransactionType.LotRemain,
            ref,
            ref_id,
            lot_id,
            amount,
            created_by
        }
        const doc = await inventoryBLL.CreateOneTransaction(ctx, params);
        res.json(doc);
        
    })

    app.use(NewAuthMiddleware(userAuthBLL));
    app.post("/transaction/for_retail", async (req, res) => {
        const ctx = ContextNS.New();
        const order_id = HttpParamValidators.MustBeString(req.body, "order_id", 6);
        const items = req.body.items;
        if (!Array.isArray(items)) {
            throw new HttpError("items must be array of transaction params", HttpStatusCodes.BadRequest);
        }
        if (items.length < 1) {
            res.json([]);
            return;
        }
        const params: InventoryNS.CreateTransactionParams[] = [];
        for (const tr of items) {
            const ref = "retail";
            const ref_id = order_id;
            const lot_id = HttpParamValidators.MustBeString(tr, 'lot_id');
            const created_by = GetAuthData(req).user_id;
            const amount = +tr.amount;
            if (isNaN(amount) || amount > 0 || amount !== Math.round(amount)) {
                throw new HttpError("transaction amount must be a negative integer", HttpStatusCodes.BadRequest);
            }
            const p: InventoryNS.CreateTransactionParams = {
                type: InventoryNS.TransactionType.LotRemain,
                ref,
                ref_id,
                created_by,
                lot_id,
                amount
            };
            params.push(p);
        }
        const docs = await inventoryBLL.CreateManyTransaction(ctx, params);
        res.json(docs);
    });
    
    app.post("/transaction/for_order", async (req, res) => {
        const ctx = ContextNS.New();
        const order_id = HttpParamValidators.MustBeString(req.body, "order_id", 6);
        const items = req.body.items;
        if (!Array.isArray(items)) {
            throw new HttpError("items must be array of transaction params", HttpStatusCodes.BadRequest);
        }
        if (items.length < 1) {
            res.json([]);
            return;
        }
        const params: InventoryNS.CreateTransactionParams[] = [];
        for (const tr of items) {
            const ref = "order";
            const ref_id = order_id;
            const lot_id = HttpParamValidators.MustBeString(tr, 'lot_id');
            const amount = +tr.amount;
            const session = GetAuthData(req);
            const created_by = session.user_id;
            if (isNaN(amount) || amount > 0 || amount !== Math.round(amount)) {
                throw new HttpError("transaction amount must be a negative integer", HttpStatusCodes.BadRequest);
            }
            const p: InventoryNS.CreateTransactionParams = {
                type: InventoryNS.TransactionType.LotRemain,
                ref,
                ref_id,
                lot_id,
                created_by,
                amount
            };
            params.push(p);
        }
        const docs = await inventoryBLL.CreateManyTransaction(ctx, params);
        res.json(docs);
    });
    
    return app;
}
