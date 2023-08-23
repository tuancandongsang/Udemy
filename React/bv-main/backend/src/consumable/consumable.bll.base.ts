import { InventoryNS } from "../inventory/inventory";
import { ProductNS } from "../product/product";
import { ConsumableNS } from "./consumable";

export class ConsumableBLLBase implements ConsumableNS.BLL {
    constructor(
        private dal: ConsumableNS.DAL,
        private productBLL: ProductNS.BLL
    ) { }

    async init() { }
    
    async GetConsumable(id: string) {
        const doc = await this.dal.GetConsumable(id);
        if (!doc) {
            throw ConsumableNS.Errors.ErrConsumableNotFound;
        }
        const producer = await this.productBLL.GetProducer(doc.producer_id);
        return {
            ...doc,
            producer,
        }
    }

    async CreateConsumable(params: ConsumableNS.CreateParamsConsumable) {
        const consumable = {
            id: ConsumableNS.Generators.NewConsumableId(),
            ...params,
            ctime: Date.now(),
            mtime: Date.now()
        }
        await this.dal.CreateConsumable(consumable);
        return consumable;
    }

    async ListConsumable() {
        const docs = await this.dal.ListConsumable();
        const view_consumbales = await Promise.all(docs.map(async el => {
            return await this.GetConsumable(el.id);
        }))
        return view_consumbales;
    }
}