import { ProductNS } from './product';
import { FilterData } from "../common/filter_data_handlers";
export class ProductBLLBase implements ProductNS.BLL {
    constructor(
        private dal: ProductNS.DAL,
    ) { }

    async init() { }
    //PRODUCER
    async ListProducer() {
        const docs = await this.dal.ListProducer();
        return FilterData<ProductNS.Producer>(docs);
    }

    async GetProducer(id: string) {
        const producer = await this.dal.GetProducer(id);
        if (!producer) {
            throw ProductNS.Errors.ErrProducerNotFound;
        }
        return producer;
    }

    async DeleteProducer(id: string) {
        const doc = await this.GetProducer(id);
        doc.dtime = Date.now();
        await this.dal.UpdateProducer(doc);
        return doc;
    }

    async UpdateProducer(id: string, params: ProductNS.UpdateProducerParams) {
        const producer = await this.GetProducer(id);
        if (params.name) {
            producer.name = params.name;
        }
        if (params.description) {
            producer.description = params.description;
        }
        producer.mtime = Date.now();
        await this.dal.UpdateProducer(producer);
    }

    async CreateProducer(params: ProductNS.CreateProducerParams) {
        const now = Date.now();
        const producer: ProductNS.Producer = {
            id: ProductNS.Generator.NewProducerId(),
            name: params.name,
            description: params.description,
            ctime: now,
            mtime: now,
        }
        await this.dal.CreateProducer(producer);
        return producer;
    }

    //PART
    async ListPart() {
        const docs = await this.dal.ListPart();
        return FilterData<ProductNS.Part>(docs);
    }

    async GetPart(id: string) {
        const part = await this.dal.GetPart(id);
        if (!part) {
            throw ProductNS.Errors.ErrPartNotFound;
        }
        return part;
    }

    async DeletePart(id: string) {
        const doc = await this.GetPart(id);
        doc.dtime = Date.now();
        await this.dal.UpdatePart(doc);
        return doc;
    }

    async UpdatePart(id: string, params: ProductNS.UpdatePartParams) {
        const part = await this.GetPart(id);
        if (params.name) {
            part.name = params.name;
        }
        if (params.description) {
            part.description = params.description;
        }
        part.mtime = Date.now();
        await this.dal.UpdatePart(part);
    }

    async CreatePart(params: ProductNS.CreatePartParams) {
        const now = Date.now();
        const part: ProductNS.Part = {
            id: ProductNS.Generator.NewPartId(),
            name: params.name,
            description: params.description,
            ctime: now,
            mtime: now,
        }
        await this.dal.CreatePart(part);
        return part;
    }

    //PRODUCT
    async ListProduct(query: ProductNS.QueryProduct) {
        const docs = await this.dal.ListProduct(query);
        return FilterData<ProductNS.Product>(docs);
    }

    async GetProduct(id: string) {
        const product = await this.dal.GetProduct(id);
        return product;
    }

    async DeleteProduct(id: string) {
        const product = await this.GetProduct(id);
        product.dtime = Date.now();
        await this.dal.UpdateProduct(product);
        return product;
    }

    async UpdateProduct(id: string, params: ProductNS.UpdateProductParams) {
        const product = await this.GetProduct(id);
        product.name = params.name;
        product.price = params.price;
        product.origin_price = params.origin_price;
        product.producer_id = params.producer_id;
        product.parts = params.parts;
        product.attrs = params.attrs;
        product.unit = params.unit;
        if(params.type) product.type = params.type;
        product.mtime = Date.now();
        await this.dal.UpdateProduct(product);
    }

    async CreateProduct(params: ProductNS.CreateProductParams) {
        const now = Date.now();
        const product: ProductNS.Product = {
            id: ProductNS.Generator.NewProductId(),
            price: params.price,
            origin_price: params.origin_price,
            unit: params.unit,
            name: params.name,
            producer_id: params.producer_id,
            parts: params.parts,
            attrs: params.attrs,
            ctime: now,
            mtime: now,
        }
        if(params.type) product.type = params.type;
        await this.dal.CreateProduct(product);
        return product;
    }
}