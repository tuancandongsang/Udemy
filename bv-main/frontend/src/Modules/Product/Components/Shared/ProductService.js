import { Http } from "../../../../Helper/Http.js";

const API_ENDPOINT = {
  //////// LOCATION
  LISTPRODUCT: '/product/list',
  DELETEPRODUCT: '/product/delete',
  CREATEPRODUCT: '/product/create',
  UPDATEPRODUCT: '/product/update',
  GETPRODUCT: '/product/get?id=',

  CREATEPRODUCER: '/product/producer/create',
  LISTPRODUCER: '/product/producer/list',
  LISTPART: '/product/part/list',
  CREATE_PART: '/product/part/create',
  GET_PART: '/product/part/get?id=',
  DELETE_PART: '/product/part/delete',
  UPDATE_PART: '/product/part/update',

  LISTMATERIAL: '/consumable/list',
  CREATE_MATERIAL: '/consumable/create',
  // UPDATE_MATERIAL: '/product/update',
  // DELETEMATERIAL: '/product/delete',
  // GETMATERIAL: '/product/get?id=',

}

class ProductService {
  constructor() {
    if (ProductService._instance) {
      return ProductService._instance;
    }
    ProductService._instance = this;

    // ... Your rest of the constructor code goes after this
  }

  ///////////////// API LOCATION ///////////////////

  //LIST PRODUCT
  listProduct() {
    return Http.get(API_ENDPOINT.LISTPRODUCT);
  }

  //LIST PRODUCER
  listProducer() {
    return Http.get(API_ENDPOINT.LISTPRODUCER);
  }

  //LIST PART
  listPart() {
    return Http.get(API_ENDPOINT.LISTPART);
  }
  // CREATE PART
  createPart(data) {
    return Http.post(API_ENDPOINT.CREATE_PART, data)
  }
  deletePart(data) {
    return Http.post(API_ENDPOINT.DELETE_PART, data)
  }
  getPart(id) {
    return Http.get(API_ENDPOINT.GET_PART + id)
  }
  updatePart(data) {
    return Http.post(API_ENDPOINT.UPDATE_PART, data)
  }

  //DELETE PRODUCT
  deleteProduct(data) {
    return Http.post(API_ENDPOINT.DELETEPRODUCT, data);
  }

  //CREATE PRODUCT
  createProduct(data) {
    return Http.post(API_ENDPOINT.CREATEPRODUCT, data);
  }

  //UPDATE PRODUCT
  updateProduct(data) {
    return Http.post(API_ENDPOINT.UPDATEPRODUCT, data);
  }

  //GET PRODUCT
  getProduct(id) {
    return Http.get(API_ENDPOINT.GETPRODUCT + id);
  }


  //PRODUCER
  getproducerById(id) {
    return Http.get(`${API_ENDPOINT.BASE}/producer/get`, { id })
  }
  getProducerList() {
    return Http.get(`${API_ENDPOINT.BASE}/producer/list`)
  }
  postProducer(payload) {
    return Http.post(`${API_ENDPOINT.CREATEPRODUCER}`, (payload))
  }
  editProducer(payload) {
    return Http.get(`${API_ENDPOINT.BASE}/producer/update`, (payload))
  }
  // Material
  listMaterial() {
    return Http.get(API_ENDPOINT.LISTMATERIAL);
  }
  postMaterial(data) {
    data.type = "material";
    return Http.post(`${API_ENDPOINT.CREATE_MATERIAL}`, data)
  }
  updateMaterial(data) {
    return Http.post(`${API_ENDPOINT.UPDATE_MATERIAL}`, data);
  }
  getMaterial(id) {
    return Http.get(API_ENDPOINT.GETMATERIAL + id)
  }
  deleteMaterial(data) {
    return Http.post(API_ENDPOINT.DELETEMATERIAL, data);
  }
}

const instance = new ProductService();

export default instance;
