import { Http } from "../../../Helper/Http";
import  UtilService  from "../../../Shared/Services/UtilService";
import { LOCALSTORAGE } from '../../../Constances/const';
const API_ENDPOINT = {
    BASE: "/job",
    GET_LIST_LOCATION: "/location/list",
    GET_CUS_BY_LOC: "/step/list",
    GET_XRAY_BY_LOC: "/location/service/list",
    GET_XRAY_INDEX_LIST_BY_SER_ID: "/service/service/get",
    UPDATE_XRAY_RESULT: "/step/finish",
    TAKE_SAMPLE: "/step/update",
}
class Xray extends UtilService {
    constructor() {
        super();
        if (Xray._instance) {
            return Xray._instance;
        }
        Xray._instance = this;
    }
    userList = [];
    selectedUser = -1;

    get location() {
        return JSON.parse(sessionStorage.getItem(LOCALSTORAGE.LOCATION) || '{}');
    }
    set location(data) {
        sessionStorage.setItem(LOCALSTORAGE.LOCATION, JSON.stringify(data))
    }

    async getCustomerByLocationAndStatus(params) {
        const url = `${API_ENDPOINT.BASE}${API_ENDPOINT.GET_CUS_BY_LOC}`;
        return (await Http.get(url, params)).data;
      }
    
      async getXrayByLocation(location_id) {
        const url = `${API_ENDPOINT.GET_EXAM_BY_LOC}`;
        return (await Http.get(url, location_id)).data;
      }
    
      async getXrayIndexListByServiceID(id) {
        const url = `${API_ENDPOINT.GET_XRAY_INDEX_LIST_BY_SER_ID}`;
        return (await Http.get(url, id)).data;
      }
    
      async getListLocation() {
        return (await Http.get(`${API_ENDPOINT.GET_LIST_LOCATION}`)).data;
      }
    
      finishXrayResult(xrayResult) {
        return Http.post(
          `${API_ENDPOINT.BASE}${API_ENDPOINT.UPDATE_XRAY_RESULT}`,
          xrayResult
        );
      }
    
      takeSample = async (step) => {
        const url = `${API_ENDPOINT.BASE}${API_ENDPOINT.TAKE_SAMPLE}`;
        return await Http.post(url, step);
      };
}

const instance = new Xray();
export default instance;