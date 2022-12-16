import request from "./request";

const API_ENDPOINT = {
  LIST_PRODUCT: "/api/products",
  SEARCH_PRODUCT: "/api/products",
  DETAIL_PRODUCT:"/api/product/"
};
class ProductService {
  constructor() {
    if (ProductService._instance) {
      return ProductService._instance;
    }
    ProductService._instance = this;
  }
  getList(pageNumber, pageSize) {
    return request.get(API_ENDPOINT.LIST_PRODUCT + `?page=${pageNumber}&size=${pageSize}`);
  }
  getSearch(pageNumber, pageSize, text){
    return request.get(API_ENDPOINT.LIST_PRODUCT + `?page=${pageNumber}&size=${pageSize}&name=${text}`);
  }
  getProductDetail(id){
    return request.get(API_ENDPOINT.DETAIL_PRODUCT + `${id}`);

  }
}

const Service = new ProductService();

export default Service;
