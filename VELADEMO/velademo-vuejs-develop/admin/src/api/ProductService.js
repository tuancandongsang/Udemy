import requestUnauthorized from "./request";

const API_ENDPOINT = {
  DETAIL_PRODUCT: "/api/admin/product/",
  LIST_PRODUCT: "/api/admin/products",
  POST_PRODUCT: "/api/admin/addProduct",
  SEARCH_PRODUCT: '/api/admin/products'
};
class ProductService {
  constructor() {
    if (ProductService._instance) {
      return ProductService._instance;
    }
    ProductService._instance = this;
  }
  get(pageNumber, pageSize) {
    return requestUnauthorized.get(API_ENDPOINT.LIST_PRODUCT + `?page=${pageNumber}&&size=${pageSize}`);
  }
  getDetail(id) {
    return requestUnauthorized.get(API_ENDPOINT.DETAIL_PRODUCT + `${id}`);
  }
  post(data) {
    return requestUnauthorized.post(API_ENDPOINT.POST_PRODUCT, data);
  }
  search(pageNumber,pageSize,text) {
    return requestUnauthorized.get(API_ENDPOINT.SEARCH_PRODUCT + `?page=${pageNumber}&size=${pageSize}&name=${text}`);
  }
}

const Service = new ProductService();

export default Service;
