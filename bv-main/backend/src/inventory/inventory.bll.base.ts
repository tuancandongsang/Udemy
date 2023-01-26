import { InventoryNS } from './inventory';
import { ContextNS } from '../ext/ctx';
import { ProductNS } from '../product/product';
import { isThisSecond, lastDayOfMonth, parseISO } from 'date-fns';
import { OrderNS } from '../order/order';
import { JobNS } from '../job/job';
import { RetailNS } from '../retail/retail';
import { ConsumableNS } from '../consumable/consumable';

export class InventoryBLLBase implements InventoryNS.BLL {
    constructor(
        private dal: InventoryNS.DAL,
        private contextBLL: ContextNS.BLL,
        private productBLL: ProductNS.BLL,
        private orderBLL: OrderNS.BLL,
        private orderDAL: OrderNS.DAL,
        private retailBLL : RetailNS.BLL,
        private retailDAL: RetailNS.DAL,
        private jobBLL : JobNS.BLL,
        private consumableBLL: ConsumableNS.BLL
    ) { }

    async init() { }

    async GetRetail(order_id: string, product_id: string) {
        const ctx = ContextNS.New();
        const listItem = await this.retailDAL.ListItem(ctx, order_id);
        const item = listItem.find(l => l.ref_id === product_id);
        return item;
    }
    async GetItem(order_id: string, product_id: string) {
        const ctx = ContextNS.New();
        const listItem = await this.orderDAL.ListItem(ctx, order_id); 
        const item = listItem.find(l => l.ref_id === product_id);
        return item;
    }

    //  WAREHOUSE
    async ListWareHouse() {
        return this.dal.ListWareHouse();
    }
    async GetWareHouse(id: string) {
        const warehouse = await this.dal.GetWareHouse(id);
        if (!warehouse) {
            throw InventoryNS.Errors.ErrWareHouseNotFound;
        }
        return warehouse;
    }

    async UpdateWareHouse(id: string, params: InventoryNS.UpdateWareHouseParams) {
        const warehouse = await this.GetWareHouse(id);
        if (params.name) {
            warehouse.name = params.name;
        }
        warehouse.mtime = Date.now();
        await this.dal.UpdateWareHouse(warehouse);
    }

    async CreateWareHouse(params: InventoryNS.CreateWareHouseParams) {
        const now = Date.now();
        const warehouse: InventoryNS.WareHouse = {
            id: InventoryNS.Generator.NewWarehouseId(),
            name: params.name,
            ctime: now,
            mtime: now
        }
        await this.dal.CreateWareHouse(warehouse);
        return warehouse;
    }

    //TRANSACTION
    async ListTransaction(query: InventoryNS.QueryTransaction) {
        const docs = await this.dal.ListTransaction(query);
        const transactions_consumable = [] as Array<InventoryNS.Transaction>;
        const transactions_product = [] as Array<InventoryNS.Transaction>;
        const ctx = ContextNS.New();
        if (query.type) {
            docs.forEach(d => { if (d.consumable_id) transactions_consumable.push(d) }); 
            const view_transactions = await Promise.all(transactions_consumable.map(async d => {
                const lots = await this.ListLot({ consumable_id : d.consumable_id });
                const current_lot = await this.GetLot(ctx, d.lot_id);
                const remain = lots.reduce((total, {remain}) => total += remain, 0);
                const consumable = await this.consumableBLL.GetConsumable(d.consumable_id);
                return { ...d, consumable, remain, lot_code: current_lot.code, warehouse_name: current_lot.warehouse.name }
            }))
            return view_transactions;
        } 
        docs.forEach(d => { if (d.product_id) transactions_product.push(d) });
        const view_transactions = await Promise.all(transactions_product.map(async d => {
            const product = await this.productBLL.GetProduct(d.product_id);
            const lots = await this.ListLot({ product_id : d.product_id });
            const current_lot = await this.GetLot(ctx, d.lot_id);
            let item;
            if(d.ref === 'retail') {
                item = await this.GetRetail(d.ref_id, d.product_id);
            } else item = await this.GetItem(d.ref_id, d.product_id);
            const remain = lots.reduce((total, {remain}) => total += remain, 0);
            return { ...d, product, item, remain , lot_code: current_lot.code, warehouse_name: current_lot.warehouse.name};
        }))
        return view_transactions;
    }

    async CountTransaction(query: InventoryNS.QueryTransaction) {
        const n = await this.dal.CountTransaction(query);
        return +n;
    }

    async ReportTransaction(query: InventoryNS.QueryTransaction) {
        const docs = await this.dal.ReportTransaction(query);
        return docs.filter(el => el.type === InventoryNS.TransactionType.LotRemain);
    }

    async GetTransaction(id: string) {
        const transaction = await this.dal.GetTransaction(id);
        if (!transaction) {
            throw InventoryNS.Errors.ErrTransactionNotFound;
        }
        return transaction;
    }

    async CreateManyTransaction(ctx: ContextNS.Context, params: InventoryNS.CreateTransactionParams[]) {
        return this.contextBLL.RunTransaction(ctx, async (ctx) => {
            let transactions : Array<InventoryNS.Transaction> = [];
            for (const p of params) {
                const trans = await this.unsafeCreateOneTransaction(ctx, p);
                transactions.push(trans);
            }
            // const transactions = await Promise.all(params.map(async p => {
            //     console.log("done" , 1)
            //     const transaction = await this.unsafeCreateOneTransaction(ctx, p);
            //     return transaction;
            // }));
            return transactions;
        });
    }

    async CreateOneTransaction(ctx: ContextNS.Context, params: InventoryNS.CreateTransactionParams) {
        return this.contextBLL.RunTransaction(ctx, async (ctx) => {
            const transaction = await this.unsafeCreateOneTransaction(ctx, params);
            return transaction;
        })
    }

    async CheckTransaction(transaction: InventoryNS.Transaction) {
        const query: InventoryNS.QueryTransaction = {
            product_id: transaction.product_id,
            ref_id: transaction.ref_id,
            lot_id: transaction.lot_id,
            warehouse_id: transaction.warehouse_id
        }
        const doc = await this.dal.ListTransaction(query)    
        if(doc.length > 0) {
            return false
        }else {
            return true
        }
    }

    async unsafeCreateOneTransaction(ctx: ContextNS.Context, params: InventoryNS.CreateTransactionParams) {
        const amount = +params.amount;
        // must be a non-zero number
        if (isNaN(amount) ) { //Math.round(amount) != amount
            throw InventoryNS.Errors.ErrTransactionAmountLimit;
        }
        if (Math.abs(amount) > 1000) {
            throw InventoryNS.Errors.ErrTransactionAmountLimit;
        }
        return this.contextBLL.RunTransaction(ctx, async (ctx) => {
            const lot = await this.GetLot(ctx, params.lot_id);
            if (params.ref === "order") {
                await this.orderBLL.GetOrder(ctx, params.ref_id);
            } else if (params.ref === "lot") {
                // already check lot_id
            } else if (params.ref == "retail") {
                await this.retailBLL.GetOrder(ctx, params.ref_id);
            } else {
                throw InventoryNS.Errors.ErrTransactionRefNotAllowed;
            }
            const now = Date.now();
            switch (params.type) {
                case InventoryNS.TransactionType.LotChange:
                    lot.total += amount;
                    lot.remain += amount;
                    if (lot.remain < 0) {
                        throw InventoryNS.Errors.ErrInsufficientAmount;
                    }
                    break;
                case InventoryNS.TransactionType.LotRemain:
                    lot.remain += amount;
                    if (Math.abs(lot.remain - Math.round(lot.remain)) < 0.06) {
                        lot.remain = Math.round(lot.remain);
                    }
                    if (lot.remain < 0) {
                        throw InventoryNS.Errors.ErrInsufficientAmount;
                    }
                    break;
                case InventoryNS.TransactionType.LotTotal:
                    lot.total += amount;
                    break;
                default:
                    throw InventoryNS.Errors.ErrTransactionTypeNotAllowed;
            }
            lot.mtime = now;
            const transaction: InventoryNS.Transaction = {
                id: InventoryNS.Generator.NewWarehouseTransactionId(),
                ref: params.ref,
                ref_id: params.ref_id,
                type: params.type,
                amount: params.amount,
                warehouse_id: lot.warehouse_id,
                created_by: params.created_by,
                lot_id: lot.id,
                ctime: now,
            };        
            if (transaction.ref === "lot") {
                if (lot.ref === InventoryNS.Type.PRODUCT) {
                    transaction.product_id = lot.ref_id;
                }
                if (lot.ref === InventoryNS.Type.CONSUMABLE) {
                    transaction.consumable_id = lot.ref_id;
                }
                if (lot.ref === InventoryNS.Type.PRODUCT) {
                    transaction.product_id = lot.ref_id;
                }
                await this.dal.CreateTransaction(ctx, transaction);
            }
            if (transaction.ref === "order") {
                if (lot.ref === InventoryNS.Type.PRODUCT) {
                    transaction.product_id = lot.ref_id;
                }
                await this.dal.CreateTransaction(ctx, transaction);
                const order = await this.orderBLL.GetOrder(ctx, params.ref_id);
                await this.jobBLL.FinishStep(ctx, order.ref_id, {
                    modified_by : params.created_by,
                    results : [{"result" : "done"}]
                })
            }
            if (transaction.ref === "retail") {
                transaction.product_id = lot.ref_id;
                await this.dal.CreateTransaction(ctx, transaction);
                const order = await this.retailBLL.GetOrder(ctx, params.ref_id);
                await this.retailBLL.FinishOrder(ctx, order.id, {
                    ref_done : 'warehouse',
                    ref_done_id : transaction.warehouse_id
                })  
            }
            await this.dal.UpdateLot(ctx, lot);
            return transaction;
        });
    }

    /// LOT
    async ListLot(query: InventoryNS.QueryTransaction) {   
        const docs = await this.dal.ListLot(query);
        const view_lots = await Promise.all(docs.map(async d => {
            const warehouse = await this.GetWareHouse(d.warehouse_id);
            if (d.ref === InventoryNS.Type.PRODUCT) {
                const product = await this.productBLL.GetProduct(d.ref_id);
                return { ...d, warehouse, ref_value : product};
            }
            if (d.ref === InventoryNS.Type.CONSUMABLE) {
                const consumable = await this.consumableBLL.GetConsumable(d.ref_id);
                return { ...d, warehouse, ref_value : consumable };
            }
            return {
                ...d,
                warehouse
            }
        }))
        return view_lots;
    }
        
    async GetLot(ctx: ContextNS.Context, id: string) {
        const lot = await this.dal.GetLot(ctx, id);
        if (!lot) {
            throw InventoryNS.Errors.ErrLotNotFound;
        }
        const warehouse = await this.GetWareHouse(lot.warehouse_id);
        if (lot.ref === InventoryNS.Type.PRODUCT) {
            const product = await this.productBLL.GetProduct(lot.ref_id);
            return { ...lot, warehouse, ref_value : product};
        }
        if (lot.ref === InventoryNS.Type.CONSUMABLE) {
            const consumable = await this.consumableBLL.GetConsumable(lot.ref_id);
            return { ...lot, warehouse, ref_value : consumable};
        }
        return {...lot, warehouse };
    }

    private mustBeISODate(date: string) {
        if (isNaN(parseISO(date).getTime())) {
            throw InventoryNS.Errors.ErrLotDate;
        }
    }

    async CreateLot(ctx: ContextNS.Context, params: InventoryNS.CreateLotParams) {
        if (params.ref === InventoryNS.Type.PRODUCT) {
            await this.productBLL.GetProduct(params.ref_id);
        }
        if (params.ref === InventoryNS.Type.CONSUMABLE) {
            await this.productBLL.GetProduct(params.ref_id);
        }
        await this.GetWareHouse(params.warehouse_id);
        this.mustBeISODate(params.man_date);
        this.mustBeISODate(params.exp_date);
        const now = Date.now();
        const lot: InventoryNS.Lot = {
            id: InventoryNS.Generator.NewLotId(),
            code: params.code,
            ref: params.ref,
            ref_id: params.ref_id,
            warehouse_id: params.warehouse_id,
            total: 0,
            remain: 0,
            man_date: params.man_date,
            exp_date: params.exp_date,
            ctime: now,
            mtime: now,
        };
        return this.contextBLL.RunTransaction(ctx, async (ctx) => {
            await this.dal.CreateLot(ctx, lot);
            await this.unsafeCreateOneTransaction(ctx, {
                type: InventoryNS.TransactionType.LotChange,
                amount: params.total,
                ref: "lot",
                ref_id: lot.id,
                lot_id: lot.id,
                created_by: params.created_by
            });
            return this.GetLot(ctx, lot.id);
        });
    }

    async UpdateLot(ctx: ContextNS.Context, id: string, params: InventoryNS.UpdateLotParams) {
        const lot = await this.GetLot(ctx, id);
        if (params.man_date) {
            this.mustBeISODate(params.man_date);
            lot.man_date = params.man_date;
        }
        if (params.exp_date) {
            this.mustBeISODate(params.exp_date);
            lot.exp_date = params.exp_date;
        }
        if (params.code) {
            lot.code = params.code;
        }
        await this.dal.UpdateLot(ctx, lot);
    }

    async GetAllLot() {
        return this.dal.GetAllLot();
    }

    async SearchProduct() {
        let viewProduct = [];
        let lots = await this.ListLot({});
        let products = await this.productBLL.ListProduct();
        //FIND OLDEST LOT
        products.forEach(p => {
            let obj = p;
            const ONE_HUNDRED_YEARS = 1000*60*60*24*365*100;
            const now = Date.now();
            let min = now + ONE_HUNDRED_YEARS;
            let total_remain = 0;
            lots.forEach((l, i) => {
                if(p.id == l.ref_id && l.remain > 0){
                    total_remain+= l.remain;
                    let exp_time = new Date(l.exp_date).getTime();
                    if(min> exp_time) {
                        min = exp_time;
                        Object.assign(l, {index: i})
                        //ADD INFO LOT INTO PRODUCT
                        Object.assign(obj, {oldestLot: l});
                        Object.assign(obj, {totalRemain: total_remain});
                    }
                }
            });
            viewProduct.push(obj);
        });
        return viewProduct;
    }
}