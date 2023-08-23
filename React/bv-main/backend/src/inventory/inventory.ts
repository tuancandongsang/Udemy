import rand from "../lib/rand";
import { ContextNS } from "../ext/ctx";
import { ProductNS } from "../product/product";
import { OrderNS } from "../order/order";
import { ConsumableNS } from "../consumable/consumable";

export namespace InventoryNS {
    export interface WareHouse {
        id: string;
        name: string;
        desc?: string;
        ctime: number;
        mtime: number;
    }

    export enum TransactionType {
        LotTotal = "lot_total", // update lot total only
        LotRemain = "lot_remain", // update lot remain only
        LotChange = "lot_change", // update both lot total and remain
    }

    export interface Transaction {
        id: string;
        type: TransactionType;
        ref: "order" |"lot" |"retail";
        ref_id: string;
        product_id?: string;
        consumable_id?: string;
        lot_id: string;
        warehouse_id: string;
        created_by : string;
        amount: number;
        ctime: number;
    }

    export enum Type {
        PRODUCT = "product",
        CONSUMABLE = "consumable"
    }
    export interface Lot {
        id: string;
        code: string;
        ref: Type; //[product, consumable]
        ref_id: string;
        warehouse_id: string;
        total: number;
        remain: number;
        man_date: string; // YYYY-MM-DD ngay nhan
        exp_date: string; // YYYY-MM-DD han su dung
        ctime: number;
        mtime: number;
    }

    export interface ViewLot extends Lot {
        warehouse: InventoryNS.WareHouse;
        ref_value?: ProductNS.Product | ConsumableNS.Consumable
    }
    export interface ViewProduct extends ProductNS.Product {
        lot: Lot;
    }
    export interface CreateWareHouseParams {
        name: string;
        desc?: string;
    }

    export interface UpdateWareHouseParams {
        name?: string;
        desc?: string;
    }

    export interface CreateTransactionParams {
        type: TransactionType;
        ref: "order" | "lot" |"retail";
        ref_id: string;
        created_by? : string;
        lot_id: string;
        amount: number;
    }

    export interface CreateLotParams {
        code: string;
        ref: Type;
        ref_id: string;
        warehouse_id: string;
        total: number;
        man_date: string;
        exp_date: string;
        created_by: string;
    }

    export interface QueryTransaction {
        warehouse_id?: string;
        product_id?: string;
        consumable_id?: string;
        lot_id?: string;
        ref_id?: string;
        type?: Type;
        ctime?: [number, number]; 
    }

    export interface UpdateLotParams {
        code?: string;
        man_date?: string;
        exp_date?: string;
    }

    export interface ViewTransaction extends Transaction {
        product?: ProductNS.Product;
        item?: OrderNS.Item;
        consumable?: ConsumableNS.Consumable;
        remain: number;
        lot_code: string;
        warehouse_name: string;
    }

    export interface ReportTransaction {
        id : string; // created_by
        // ref: "order" |"lot" |"retail";
        // ref_id: string;
        type: InventoryNS.TransactionType;
        amount: number;
        name: string; // product_name or consumbale_name
        type_name: InventoryNS.Type;
        lot_code: string;
        warehouse_name: string;
        remain: number;
        ctime: number;
    }
    export interface BLL {
        ListWareHouse(): Promise<WareHouse[]>;
        GetWareHouse(id: string): Promise<WareHouse>;
        CreateWareHouse(params: CreateWareHouseParams): Promise<WareHouse>;
        UpdateWareHouse(id: string, params: UpdateWareHouseParams): Promise<void>;

        ListTransaction(query: QueryTransaction): Promise<ViewTransaction[]>;
        ReportTransaction(query: QueryTransaction): Promise<ReportTransaction[]>;
        CountTransaction(query: QueryTransaction): Promise<number>;
        GetTransaction(id: string): Promise<Transaction>;
        CreateManyTransaction(ctx: ContextNS.Context, params: CreateTransactionParams[]): Promise<Transaction[]>;
        CreateOneTransaction(ctx: ContextNS.Context, params: CreateTransactionParams): Promise<Transaction>;

        ListLot(query?: QueryTransaction): Promise<ViewLot[]>;
        GetLot(ctx: ContextNS.Context, id: string): Promise<ViewLot>;
        CreateLot(ctx: ContextNS.Context, params: CreateLotParams): Promise<Lot>;
        UpdateLot(ctx: ContextNS.Context, id: string, params: UpdateLotParams): Promise<void>;
        GetAllLot(): Promise<Lot[]>;

        SearchProduct(): Promise<ViewProduct[]>;
    }

    export interface DAL {
        ListWareHouse(): Promise<WareHouse[]>;
        GetWareHouse(id: string): Promise<WareHouse>;
        CreateWareHouse(wareHouse: WareHouse): Promise<void>;
        UpdateWareHouse(wareHouse: WareHouse): Promise<void>;

        ListTransaction(query: QueryTransaction): Promise<Transaction[]>;
        ReportTransaction(query: QueryTransaction): Promise<ReportTransaction[]>;
        CountTransaction(query: QueryTransaction): Promise<number>;
        GetTransaction(id: string): Promise<Transaction>;
        CreateTransaction(ctx: ContextNS.Context, transaction: Transaction): Promise<void>;

        ListLot(query?: QueryTransaction): Promise<Lot[]>;
        GetLot(ctx: ContextNS.Context, id: string): Promise<Lot>;
        CreateLot(ctx: ContextNS.Context, lot: Lot): Promise<void>;
        UpdateLot(ctx: ContextNS.Context, lot: Lot): Promise<void>;
        GetAllLot(): Promise<Lot[]>;
    }

    export const Common = {
        MaxLotChange: 1000,
        SortLots : (array: Array<InventoryNS.Lot>) => array.sort((a,b) => {
            return new Date(a.exp_date).getTime() - new Date(b.exp_date).getTime() && a.remain - b.remain 
        })
    };

    export const Errors = {
        ErrWareHouseNotFound: new Error("WareHouse not found"),
        ErrLotDate: new Error("Lot date invalid"),
        ErrLotCodeExisted: new Error("lot code existed for the current warehouse"),
        ErrLotNotFound: new Error("Lot not found"),
        ErrTransactionRefNotAllowed: new Error("transaction ref not allowed"),
        ErrTransactionNotFound: new Error("Transaction not found"),
        ErrTransactionAmountLimit: new Error(`transaction amount must be between 1 and ${Common.MaxLotChange}`),
        ErrTransactionTypeNotAllowed: new Error(`transaction type not allowed`),
        ErrInsufficientAmount: new Error("Insuccicient amount"),
        ErrTransactionNotSupported: new Error("transaction not supported"),
    }

    export const Generator = {
        NewWarehouseId: () => rand.uppercase(10), // colision 2^25
        NewLotId: () => rand.alphabet(12), // collision 2^36
        NewWarehouseTransactionId: () => rand.uppercase(16), // collision 2^48
    };
}