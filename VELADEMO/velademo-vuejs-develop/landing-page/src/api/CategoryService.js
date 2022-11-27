import request from "./request";

const API_ENDPOINT = {
  CATEGORY_GET: "/api/categories",
  CATEGORY_SEARCH: "/api/categories",

};
class CategoryService {
  constructor() {
    if (CategoryService._instance) {
      return CategoryService._instance;
    }
    CategoryService._instance = this;
  }
  getCategory() {
    return request.get(API_ENDPOINT.CATEGORY_GET);
  }
}

const Service = new CategoryService();

export default Service;
