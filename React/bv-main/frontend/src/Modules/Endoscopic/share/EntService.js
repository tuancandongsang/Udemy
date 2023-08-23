import { Http } from "../../../Helper/Http";
import  UtilService  from "../../../Shared/Services/UtilService";
import { LOCALSTORAGE } from '../../../Constances/const';

const API_ENDPOINT = {
    BASE: "/job",
    GET_LIST_LOCATION: "/location/list",
    GET_CUS_BY_LOC: "/step/list",
    GET_ENT_BY_LOC: "/location/service/list",
    GET_ENT_INDEX_LIST_BY_SER_ID: "/service/service/get",
    UPDATE_ENT_RESULT: "/step/finish",
    TAKE_SAMPLE: "/step/update",

    UPLOAD_PHOTO: "/data/photo/upload",
    DOWNLOAD_PHOTO: "/data/photo/download/",
    GETMETADATA : "/data/get/"
}
class Ent extends UtilService {
    constructor() {
        super();
        if (Ent._instance) {
            return Ent._instance;
        }
        Ent._instance = this;
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
    
    async getEntByLocation(location_id) {
      const url = `${API_ENDPOINT.GET_ENT_BY_LOC}`;
      return (await Http.get(url, location_id)).data;
    }
    
    async getEntIndexListByServiceID(id) {
      const url = `${API_ENDPOINT.GET_ENT_INDEX_LIST_BY_SER_ID}`;
      return (await Http.get(url, id)).data;
    }
    
    async getListLocation() {
      return (await Http.get(`${API_ENDPOINT.GET_LIST_LOCATION}`)).data;
    }
    
    async uploadPhoto(data) {
      const url = `${API_ENDPOINT.UPLOAD_PHOTO}`;
      return (await Http.post(url, data));
    }

    async downloadPhoto(name) {
      const url = `${API_ENDPOINT.DOWNLOAD_PHOTO}`
      return (await Http.get(url+name))
    }
    // async getMetadatImg(name) {
    //   const url = `${API_ENDPOINT.GETMETADATA}`
    //   return (await Http.get(url+name))
    // }
    finishEntResult(entResult) {
        return Http.post(
          `${API_ENDPOINT.BASE}${API_ENDPOINT.UPDATE_ENT_RESULT}`,
          entResult
        );
    }
    
    takeSample = async (step) => {
        const url = `${API_ENDPOINT.BASE}${API_ENDPOINT.TAKE_SAMPLE}`;
        return await Http.post(url, step);
    };
}

const instance = new Ent();
export default instance;