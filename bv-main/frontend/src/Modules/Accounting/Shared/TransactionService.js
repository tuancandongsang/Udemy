import { Http } from "../../../Helper/Http";
import { BASE_URL, STEP_TYPE, ALL} from "../../../Constances/const";

const API_ENDPOINT = {
  LIST_TRANSACTION_INVENTORY: '/inventory/transaction/list',
  REPORT_TRANSACTION_INVENTORY: '/inventory/transaction/report?',

  REPORT_SERVICE_MONTH_INTERVAL: "/report/service?interval=",
  REPORT_SERVICE_DAY_INTERVAL: "/report/service?interval="
}
class TransactionService {
  constructor() {
    if (TransactionService._instance) {
      return TransactionService._instance;
    }
    TransactionService._instance = this;

    // ... Your rest of the constructor code goes after this
  }

  // service service

  //   changeQuantity(order_id,quantity){
  //     return Http.post(`/order/item/update`,{order_id})
  // }
  getOrderList(order_id) {
    return Http.get(`/order/item/list`, { order_id });
  }
  getUserbyId(id) {
    return Http.get(`/org/user/get`,{id})
  }
  getUserList(payload){
    return Http.get(`/org/user/list`,payload)
  }
  getHistoryTransactionByTimeAndUserID(user_id,start_date,end_date){
    if(user_id === ALL.code) {
      return Http.get(`/accounting/transaction/list`,{start_date,end_date})
    }
    return Http.get(`/accounting/transaction/list`,{user_id,start_date,end_date})
  }
  getBookList(status) {
    return Http.get(`/accounting/book/list`, {status});
  }
  getOrder(code) {
    return Http.get(`/order/order/get`, { code });
  }
  postTransaction(payload) {
    return Http.post(`/accounting/transaction/create`, payload);
  }
  postManyTransaction(payload) {
    return Http.post(`/accounting/transaction/create_many`, payload);
  }
  getListTransaction(customer_code){
    return Http.get(`/job/step/list?customer_code=${customer_code}&&type=${[STEP_TYPE.EXAM,STEP_TYPE.TEST]}`)
  }
  getListStepCancel(customer_id, date) {
    return Http.get(`/job/job/list?customer_id=${customer_id}&&date=${date}`)
  }
  getCustomer(code) {
    return Http.get(`/customer/customer/get`, {code})
  }
  cancelTransaction(data){
    return Http.post(`/job/step/update`, data);
  }
  postEditOrder(item){
    return Http.post(`/order/item/update`,item )
  }
  getStep(id) {
    return Http.get(`/job/step/get`, {id});
  }
  exporExcelTransaction(user_id,start_date,end_date) {
    return `${BASE_URL}/accounting/transaction/export-excel?user_id=${user_id}&&start_date=${start_date}&&end_date=${end_date}`
  }
  reportTransPharmacy(data) {
    let query = `start_date=${data.start_date}&&end_date=${data.end_date}&&mode=${data.mode}`;
    if(data.user_id) query += `&&user_id=${data.user_id}`;
    return Http.get(API_ENDPOINT.REPORT_TRANSACTION_INVENTORY + query);
  }

  exporExcelTransPharmacy(data) {
    let query = `start_date=${data.start_date}&&end_date=${data.end_date}&&mode=${data.mode}`;
    if(data.user_id) query += `&&user_id=${data.user_id}`;
    return `${BASE_URL}/inventory/transaction/report?` + query;
  }
  inventoryListTransaction(query) {
    if(query)  return Http.get(API_ENDPOINT.LIST_TRANSACTION_INVENTORY + `?start_date=${query.start_date}&&end_date=${query.end_date}`);
    return Http.get(API_ENDPOINT.LIST_TRANSACTION_INVENTORY);
  }

  //report
  reportByServiceMonthInterval(interval="day", type) {
    if (type) {
      return Http.get(API_ENDPOINT.REPORT_SERVICE_MONTH_INTERVAL + interval + "&&type=" + type )
    }
    return Http.get(API_ENDPOINT.REPORT_SERVICE_MONTH_INTERVAL + interval)
  }
  reportByServiceID(interval="day", service_id, start_date, end_date) {
    if (start_date && end_date) {
      return Http.get(API_ENDPOINT.REPORT_SERVICE_MONTH_INTERVAL + interval + "&&service_id=" + service_id + "&&start_date="+start_date+"&&end_date="+end_date)
    } 
    return Http.get(API_ENDPOINT.REPORT_SERVICE_MONTH_INTERVAL + interval + "&&service_id=" + service_id)
  }
  //export excel report by services
  exportExcelReportAllService(interval="month", service_id) {
    if (service_id) {
      return `${BASE_URL}/report/service/export-excel?interval=${interval}&&service_id=${service_id}`
    }
    return `${BASE_URL}/report/service/export-excel?interval=${interval}`
  }

  exportExcelByService(interval="day", service_id, start_date, end_date) {
    return `${BASE_URL}/report/service/export-excel?interval=${interval}&&service_id=${service_id}&&start_date=${start_date}&&end_date=${end_date}`
  }
}

const instance = new TransactionService();

export default instance;
