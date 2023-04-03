import request from './request';
import { API_ENDPOINT } from '@/constants'

class listService {
  constructor() {
    if (listService._instance) {
      return listService._instance;
    }
    listService._instance = this;
  }
  getListAll() {
    return request.get(API_ENDPOINT.LIST_ALL);
  }
  getListDetail(id) {
    return request.get(API_ENDPOINT.LIST_DETAIL + `/${id}`);
  }
  getListUpdate(id, data) {
    return request.patch(API_ENDPOINT.LIST_UPDATE + `/${id}`, data);
  }
}

const Service = new listService();

export default Service;
