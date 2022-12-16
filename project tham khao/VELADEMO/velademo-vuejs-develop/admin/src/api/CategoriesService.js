import requestUnauthorized from "./request";

const API_ENDPOINT = {
  GET_CATEGORIEES: "/api/categories",

};
class CategoriesService {
  constructor() {
    if (CategoriesService._instance) {
      return CategoriesService._instance;
    }
    CategoriesService._instance = this;
  }
  get() {
    return requestUnauthorized.get(API_ENDPOINT.GET_CATEGORIEES );
  }
 
}

const Service = new CategoriesService();

export default Service;
