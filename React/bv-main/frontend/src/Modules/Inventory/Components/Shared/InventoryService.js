import { WAREHOUSE_TYPE } from "../../../../Constances/const.js";
import { Http } from "../../../../Helper/Http.js";

const API_ENDPOINT = {
  //////// LOCATION
  LIST_WAREHOUSE: '/inventory/warehouse/list',
  LIST_BATCH: '/inventory/lot/list?warehouse_id=',
  LIST_TRANSACTION: '/inventory/transaction/list',
  LIST_PRODUCT: '/product/list',
  LIST_PRODUCER: '/product/producer/list',

  LIST_CONSUMABLE: "/consumable/list",

  DELETE_PRODUCER: '/product/producer/delete',
  GET_PRODUCER: '/product/producer/get?id=',
  EDIT_PRODUCER: '/product/producer/update',
  POST_PRODUCER: '/product/producer/create',

  GET_PRODUCT: '/product/get?id=',

  UPDATE_LOT: '/inventory/lot/update?id=',

  ALL_BATCH: '/inventory/lot/list?type=',
  GET_LOT: '/inventory/lot/get?id=',
  POST_BATCH: '/inventory/lot/create',

  LIST_TRANSACTION_CONSUMABLE: "/inventory/transaction/list?type=",
  GET_TRANSACTION: '/inventory/transaction/get?id=',
  CREATE_TRANSACTION_FOR_LOT: '/inventory/transaction/for_lot',
}

class InventoryService {
  constructor() {
    if (InventoryService._instance) {
      return InventoryService._instance;
    }
    InventoryService._instance = this;

    // ... Your rest of the constructor code goes after this
  }


  //LIST WAREHOUSE
  listWareHouse() {
    return Http.get(API_ENDPOINT.LIST_WAREHOUSE);
  }
  //LIST BATCH
  listLot(warehouse_id) {
    return Http.get(API_ENDPOINT.LIST_BATCH + warehouse_id);
  }
  //LIST TRANSACTION
  listTransaction(start_date, end_date) {
    return Http.get(API_ENDPOINT.LIST_TRANSACTION);
  }
  //LIST PRODUCT
  listProduct() {
    return Http.get(API_ENDPOINT.LIST_PRODUCT);
  }

  listConsumable() {
    return Http.get(API_ENDPOINT.LIST_CONSUMABLE);
  }
  //ALL BATCH
  allLot(type = WAREHOUSE_TYPE.PRODUCT) {
    return Http.get(API_ENDPOINT.ALL_BATCH + type);
  }
  //DELETE BATCH
  deleteLot() {
    throw new Error("cannot delete lot");
  }

  //GET PRODUCT
  getProduct(id) {
    return Http.get(API_ENDPOINT.GET_PRODUCT + id);
  }
  //GET BATCH
  getLot(id) {
    return Http.get(API_ENDPOINT.GET_LOT + id);
  }
  //LIST_TRANSACTION_CONSUMABLE
  listTransactionConsumable(type) {
    return Http.get(API_ENDPOINT.LIST_TRANSACTION_CONSUMABLE + type)
  }
  //LIST_TRANSACTION_CONSUMABLE BY ID
  listTransactionConsumableById(type, id, start_date, end_date) {
    return Http.get(API_ENDPOINT.LIST_TRANSACTION_CONSUMABLE + type + "&&lot_id=" + id +"&&start_date="+start_date+"&&end_date="+end_date)
  }
  //GET TRANSACTION
  getTransaction(id) {
    return Http.get(API_ENDPOINT.GET_TRANSACTION + id)
  }

  //CREATE TRANSACTION
  createTransactionForLot(data) {
    return Http.post(API_ENDPOINT.CREATE_TRANSACTION_FOR_LOT, data);
  }

  //PRODUCT
  postProduct(payload) {
    return Http.post(`${API_ENDPOINT.BASE}/create`, payload)
  }
  getProductById(id) {
    return Http.get(`${API_ENDPOINT.BASE}/get`, { id })
  }
  delProduct(id) {
    return Http.post(`${API_ENDPOINT.BASE}/delete`, { id })
  }
  editProduct(payload) {
    return Http.post(`${API_ENDPOINT.BASE}/update`, payload)
  }

  /////////////WAREHOUSE
  getWarehouseList() {
    return Http.get(`${API_ENDPOINT.BASE}/warehouse/list`)
  }
  ///////***************************** */

  getLotById(id) {
    return Http.get(`${API_ENDPOINT.BASE}/lot/get`, { id })
  }
  getLotList() {
    return Http.get(`${API_ENDPOINT.BASE}/lot/list`)
  }
  createLot(data) {
    return Http.post(API_ENDPOINT.POST_BATCH, data)
  }
  editLot(id, data) {
    return Http.post(`${API_ENDPOINT.UPDATE_LOT}${id}`, data)
  }

  //PRODUCER
  getProducerList() {
    return Http.get(`${API_ENDPOINT.LIST_PRODUCER}`)
  }
  deleteProducer(data) {
    return Http.post(`${API_ENDPOINT.DELETE_PRODUCER}`, data)
  }
  getProducerbyId(id) {
    return Http.get(API_ENDPOINT.GET_PRODUCER + id)
  }
  editProducer(payload) {
    return Http.post(API_ENDPOINT.EDIT_PRODUCER, payload)
  }
  postProducer(payload) {
    return Http.post(API_ENDPOINT.POST_PRODUCER, payload)
  }
}

const instance = new InventoryService();

export default instance;
