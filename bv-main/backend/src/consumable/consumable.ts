import rand from "../lib/rand"
import { ProductNS } from "../product/product"

export namespace ConsumableNS {
    export interface Consumable {
        id: string;
        name: string;
        producer_id: string;
        unit: string; // don vi
        note?: string;
        ctime: number;
        mtime: number;
        dtime?: number;
    }

    export interface CreateParamsConsumable {
        name: string;
        producer_id: string;
        unit: string;
        note?: string;
    }

    export interface ViewConsumables extends Consumable {
        producer: ProductNS.Producer;
    }
    export interface BLL {
        GetConsumable(id: string): Promise<ViewConsumables>;
        ListConsumable(): Promise<ViewConsumables[]>;
        CreateConsumable(params: CreateParamsConsumable): Promise<Consumable>;
    }

    export interface DAL {
        GetConsumable(id: string): Promise<Consumable>;
        ListConsumable(): Promise<Consumable[]>;
        CreateConsumable(consumable: Consumable) : Promise<void>;
    }

    export const Generators = {
        NewConsumableId: () => rand.number(12)
    }

    export const Errors = {
        ErrConsumableExist: new Error("Consumable existed"),
        ErrConsumableNotFound: new Error("Consumable not found")
    }
}