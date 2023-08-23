import { Http } from "../../../Helper/Http";
import { UtilService } from "./";
import { LOCALSTORAGE } from "../../../Constances/const";
import * as printJS from "print-js";

const API_ENDPOINT = {
  BASE: "/job",
  GET_LIST_LOCATION: "/location/list",
  GET_CUS_BY_LOC: "/step/list",
  GET_EXAM_BY_LOC: "/location/service/list",
  GET_EXAM_INDEX_LIST_BY_SER_ID: "/service/service/get",
  UPDATE_EXAM_RESULT: "/step/finish",
  TAKE_SAMPLE: "/step/update",
  GET_USER_BY_ID: "/org/user/get?id=",
  GET_USER_ID_BY_SAMPLE_ID: "/sample/get?id="
};

class Exam extends UtilService {
  constructor() {
    super();
    if (Exam._instance) {
      return Exam._instance;
    }
    Exam._instance = this;
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
  getUserByUserId = (id) => {
    return Http.get(API_ENDPOINT.GET_USER_BY_ID + id)
  }
  getUserIDBySampleID(id) {
    return Http.get(API_ENDPOINT.GET_USER_ID_BY_SAMPLE_ID + id)
  }


  async getCustomerByLocationAndStatus(params) {
    const url = `${API_ENDPOINT.BASE}${API_ENDPOINT.GET_CUS_BY_LOC}`;
    return (await Http.get(url, params)).data;
  }

  async getExamByLocation(location_id) {
    const url = `${API_ENDPOINT.GET_EXAM_BY_LOC}`;
    return (await Http.get(url, location_id)).data;
  }
  printExamResult = (id) => {
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
                  .printExam{
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

  async getExamIndexListByServiceID(id) {
    const url = `${API_ENDPOINT.GET_EXAM_INDEX_LIST_BY_SER_ID}`;
    return (await Http.get(url, id)).data;
  }

  async getListLocation() {
    return (await Http.get(`${API_ENDPOINT.GET_LIST_LOCATION}`)).data;
  }
  async createSampleIdByRef(order_id) {
    return (await Http.post(`/sample/create`, { order_id }))
  }
  async getResultsByStepId(id) {
    let res = await Http.get(`/job/step/get`, { id })
    return res
  }
  async updateExamResult(payload) {
    return (await Http.post(`/job/step/finish`, payload))
  }


  finishExamResult(examResult) {
    return Http.post(
      `${API_ENDPOINT.BASE}${API_ENDPOINT.UPDATE_EXAM_RESULT}`,
      examResult
    );
  }

  takeSample = async (step) => {
    const url = `${API_ENDPOINT.BASE}${API_ENDPOINT.TAKE_SAMPLE}`;
    return await Http.post(url, step);
  };
}

const instance = new Exam();

export default instance;
