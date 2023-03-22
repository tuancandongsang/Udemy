import request from "./request";
import { API } from "../constants/index";

class listService {
  constructor() {
    if (listService._instance) {
      return listService._instance;
    }
    listService._instance = this;
  }
  getListAll() {
    return request.get(API.LIST_ALL_CHAT);
  }
  getListDetail(face) {
    return request.get(API.LIST_CHAT_ONE_FACE + `/${face}`);
  }
  getListUpdate(id, data) {
    return request.patch(API.LIST_CHAT_ONE_FACE + `/${id}`, data);
  }
}

const Service = new listService();

export default Service;
