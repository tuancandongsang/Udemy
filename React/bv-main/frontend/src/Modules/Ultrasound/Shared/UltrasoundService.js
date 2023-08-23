import { Http } from "../../../Helper/Http";
import { UtilService } from ".";
import { LOCALSTORAGE } from "../../../Constances/const";
import * as printJS from "print-js";

const API_ENDPOINT = {
  BASE: "/job",
  GET_LIST_LOCATION: "/location/list",
  GET_CUS_BY_LOC: "/step/list",
  GET_ULTRA_BY_LOC: "/location/service/list",
  GET_ULTRA_INDEX_LIST_BY_SER_ID: "/service/service/get",
  UPDATE_ULTRA_RESULT: "/step/finish",
  TAKE_SAMPLE: "/step/update",
  GET_USER_BY_ID: "/org/user/get?id=",
  UPLOAD_PHOTO: "/data/photo/upload",
  DOWNLOAD_PHOTO: "/data/photo/download/"
};

class UltrasoundService extends UtilService {
  constructor() {
    super();
    if (UltrasoundService._instance) {
      return UltrasoundService._instance;
    }
    UltrasoundService._instance = this;
  }

  userList = [];
  selectedUser = -1;

  get location() {
    return JSON.parse(sessionStorage.getItem(LOCALSTORAGE.LOCATION) || '{}');
  }

  set location(data) {
    sessionStorage.setItem(LOCALSTORAGE.LOCATION, JSON.stringify(data))
  }

  getUserById = (id) => {
    return Http.post(API_ENDPOINT.GET_USER_BY_ID + id)
  }

  async getCustomerByLocationAndStatus(params) {
    const url = `${API_ENDPOINT.BASE}${API_ENDPOINT.GET_CUS_BY_LOC}`;
    return (await Http.get(url, params)).data;
  }

  async getUltraByLocation(location_id) {
    const url = `${API_ENDPOINT.GET_ULTRA_BY_LOC}`;
    return (await Http.get(url, location_id)).data;
  }
  printUltrasoundResult = (id) => {
    printJS({
      printable: id,
      type: 'html',
      header: null,
      footer: null,
    });
  }
  print = (id) => {
    printJS({
      printable: id,
      type: 'html',
      targetStyles: ['*'],
      style: `@page {
          size: A4;
          margin: 0;
                  },
               @media print {
                  .medPrintId{
                    margin: 0;
                    border: initial;
                    border-radius: initial;
                    width: initial;
                    min-height: initial;
                    box-shadow: initial;
                    background: initial;
                    page-break-after: always;
                    
                    h1 {
                    page-break-before: always;
                    }

                    h1, h2, h3, h4, h5 {
                    page-break-after: avoid;
                    }

                    table, figure {
                    page-break-inside: avoid;
                    }
                    }`,
        header: null,
        footer: null,
      });
  };


  async getUltraIndexListByServiceID(id) {
    const url = `${API_ENDPOINT.GET_ULTRA_INDEX_LIST_BY_SER_ID}`;
    return (await Http.get(url, id)).data;
  }

  async getListLocation() {
    return (await Http.get(`${API_ENDPOINT.GET_LIST_LOCATION}`)).data;
  }

  finishUtralResult(ultraResult) {
    return Http.post(
      `${API_ENDPOINT.BASE}${API_ENDPOINT.UPDATE_ULTRA_RESULT}`,
      ultraResult
    );
  }

  takeSample = async (step) => {
    const url = `${API_ENDPOINT.BASE}${API_ENDPOINT.TAKE_SAMPLE}`;
    return await Http.post(url, step);
  };
  async uploadPhoto(data) {
    const url = `${API_ENDPOINT.UPLOAD_PHOTO}`;
    return (await Http.post(url, data));
  }
  async downloadPhoto(name) {
    const url = `${API_ENDPOINT.DOWNLOAD_PHOTO}`
    return (await Http.get(url + name))
  }
}

const instance = new UltrasoundService();

export default instance;
