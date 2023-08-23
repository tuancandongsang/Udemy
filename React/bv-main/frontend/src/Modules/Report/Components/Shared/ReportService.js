import { Http } from "../../../../Helper/Http.js";

const API_ENDPOINT = {
    GET_LIST : '/accounting/transaction/origin/list?'
}

class ReportService {
  constructor() {
    if (ReportService._instance) {
      return ReportService._instance;
    }
    ReportService._instance = this;

    // ... Your rest of the constructor code goes after this
  }
  getListReport(query) {
      return Http.get(API_ENDPOINT.GET_LIST + 'start_date=' + query.start_date + '&&end_date=' + query.end_date)
  }
}

const instance = new ReportService();

export default instance;
