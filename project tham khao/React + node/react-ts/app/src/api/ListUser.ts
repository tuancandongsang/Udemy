import requestUnauthorized from "./request";
import {API_USER} from "./constanst"
import { AxiosRequestConfig } from "axios";

class ListUser {
  static _instance: any;
  constructor() {
    if (ListUser._instance) {
      return ListUser._instance;
    }
    ListUser._instance = this;
  }
  get(data: AxiosRequestConfig<any> | undefined) {
    return requestUnauthorized.get(API_USER.GET, data);
  }
  create(data: any) {
    return requestUnauthorized.post(API_USER.CREATE, data);
  }
  update(data:any) {
    return requestUnauthorized.put(API_USER.UPDATE + `/${data.id}`, data);
  }
  delete(id: any) {
    return requestUnauthorized.delete(API_USER.DELETE + `/${id}`);
  }
}

const Service = new ListUser();

export default Service;
