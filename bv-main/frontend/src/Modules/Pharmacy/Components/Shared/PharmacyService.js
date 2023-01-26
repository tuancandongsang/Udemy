import { Http } from "../../../../Helper/Http.js";

const API_ENDPOINT = {
    GET_ORDER: '/order/order/get?code=',

    GET_CUSTOMER: '/customer/customer/get?code=',

    GET_ORDER_BY_CUSTOMER: '/job/job/list?type=buy&&customer_id=',

    GET_JOB: '/job/job/list?customer_id=',

    LIST_LOT: '/inventory/lot/list',

    CREATE_TRANSACTION: '/inventory/transaction/for_order',

    CREATE_TRANSACTION_RETAIL: '/inventory/transaction/for_retail',

    CREATE_ACCOUNTING_TRANSACTION: '/accounting/transaction/create',

    SEARCH_PRODUCT: '/inventory/search?by=product&&text=',

    FINISH_ORDER: '/job/step/finish',

    CREATE_ORDER: '/job/step/add',

    CREATE_DETAIL_ORDER: '/retail/create',

    UPDATE_QUANTITY_PRODUCT: '/order/item/update',
}

class PharmacyService {
  constructor() {
    if (PharmacyService._instance) {
      return PharmacyService._instance;
    }
    PharmacyService._instance = this;

    // ... Your rest of the constructor code goes after this
  }

  getOrder(code) {
    return Http.get(API_ENDPOINT.GET_ORDER + code);
  }
  getOrderByCustomer(id) {
    return Http.get(API_ENDPOINT.GET_ORDER_BY_CUSTOMER + id);
  }
  getCustomer(code) {
    return Http.get(API_ENDPOINT.GET_CUSTOMER + code);
  }
  getJob(customerId){
    return Http.get(API_ENDPOINT.GET_JOB + customerId);
  }
  listLot() {
    return Http.get(API_ENDPOINT.LIST_LOT);
  }
  createTransaction(data) {
    return Http.post(API_ENDPOINT.CREATE_TRANSACTION, data);
  }
  createTransactionRetail(data) {
    return Http.post(API_ENDPOINT.CREATE_TRANSACTION_RETAIL, data);
  }
  createAccountingTransaction(data) {
    return Http.post(API_ENDPOINT.CREATE_ACCOUNTING_TRANSACTION, data);
  }
  searchProduct(text) {
    return Http.get(API_ENDPOINT.SEARCH_PRODUCT + text);
  }

  finishOrder(data) {
    return Http.post(API_ENDPOINT.FINISH_ORDER, data);
  }

  createOrder(data) {
    return Http.post(API_ENDPOINT.CREATE_ORDER, data);
  }

  createRetailOrder(data) {
    return Http.post(API_ENDPOINT.CREATE_DETAIL_ORDER, data);
  }
  updateQuantity(data) {
    return Http.post(API_ENDPOINT.UPDATE_QUANTITY_PRODUCT, data);
  }
}

const instance = new PharmacyService();

export default instance;
