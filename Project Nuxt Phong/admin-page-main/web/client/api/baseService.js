import axios from "axios";
import constants from "../config/constants";
import qs from "qs";
export default class BaseService {
  static request = () => {
    axios.defaults.baseURL = constants.BASE_SERVICE;
    return axios;
  };
  static querystring(obj) {
    return qs.stringify(obj, {
      encodeValuesOnly: true,
    });
  }
}
