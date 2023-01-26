import { Http } from '../../Helper/Http';
import bwipjs from "bwip-js";
import * as printJS from "print-js";
import { BASE_URL } from '../../Constances/const';

const API_ENDPOINT = {
  GETLISTJOBSTEP: '/job/step/list',
  GETLISTJOB: '/job/job/list',
  POSTSUBCLINICAL: "/job/job/state",
  GET_JOB_BY_CUS_ID: "/job/job/list?customer_id=",
  GET_RESULT: '/job/job/list',
  GET_LIST_LOCATION: '/location/list',
  GET_USER_BY_ID: '/org/user/get?id=',
  GET_LIST_DOCTOR: '/org/user/list',

  SEARCHJOBSTEP: "/job/step/search?location_id=",
  SSELISTJOBSTEP: "/job/step/sse-list"
};

class ShareService {
  constructor() {
    if (ShareService._instance) {
      return ShareService._instance;
    }
    ShareService._instance = this;
  }
  getDoctor() {
    return Http.get(API_ENDPOINT.GET_LIST_DOCTOR);
  }
  getUserById(id) {
    return Http.get(API_ENDPOINT.GET_USER_BY_ID + id)
  }
  getListLocation() {
    return Http.get(API_ENDPOINT.GET_LIST_LOCATION);
  }
  getResult(data) {
    const customer_id = data.customer_id;
    const date = data.date;
    return Http.get(API_ENDPOINT.GET_RESULT + '?customer_id=' + customer_id + '&&date=' + date);
  }
  getCustomerByCode(text) {
    return Http.get(`/customer/customer/search`, { text })
  }
  getJobByCustomerId(customer_id) {
    return Http.get(API_ENDPOINT.GET_JOB_BY_CUS_ID + customer_id)
  }
  getListJobStep(payload) {
    return Http.get(API_ENDPOINT.GETLISTJOBSTEP, payload);
  }
  searchListJobStep(payload) {
    if (payload.customer_code) {
      return Http.get(`${API_ENDPOINT.SEARCHJOBSTEP}${payload.location_id}&&customer_code=${payload.customer_code}`);
    }
    if (payload.full_name) {
      return Http.get(`${API_ENDPOINT.SEARCHJOBSTEP}${payload.location_id}&&full_name=${payload.full_name}`);
    }
  }

  sseListJobStep(payload) {
    const { location_id, status } = payload;
    const event = new EventSource(`${BASE_URL}${API_ENDPOINT.SSELISTJOBSTEP}?location_id=${location_id}&&status=${status}`);;
    return event;
  }

  getListJob(payload) {
    return Http.get(API_ENDPOINT.GETLISTJOB, payload);
  }
  postSubclinical(data) {
    return Http.post(API_ENDPOINT.POSTSUBCLINICAL, data)
  }
  print = (id) => {
    printJS({
      printable: id,
      type: 'html',
      targetStyles: ['*'],
      style: `@page {
          size: A5;
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
                  }`,
      header: null,
      footer: null,
    });
  };
  printhorizontal = (id) => {
    printJS({
      printable: id,
      type: 'html',
      targetStyles: ['*'],
      style: `@page {
          size: Letter landscape;
        }`,
      header: null,
      footer: null,
    });
  }
  printBarCode = (id) => {
    printJS({
      printable: id,
      type: 'html',
      scanStyles: false,
      targetStyles: ['*'],
      style: `@page { size: landscape;}`,
      header: null,
      footer: null,
    });
  };
  createBarcode(step_id) {
    try {
      const canvas = bwipjs.toCanvas("canvas_id", {
        bcid: "code128",
        text: step_id,
        scale: 5,
        // height: 8,
        includetext: true,
        textxalign: "center"
      });
      return canvas;
    } catch (error) {
      throw error;
    }
  };

  createEtccode(step_id, id) {
    try {
      const canvas = bwipjs.toCanvas(id, {
        bcid: "code128",
        text: step_id,
        scale: 1,
        height: 8,
        includetext: true,
        textxalign: "center",
      });
      return canvas;
    } catch (error) {
      throw error;
    }
  };
  createOtccode(step_id, id) {
    try {
      const canvas = bwipjs.toCanvas(id, {
        bcid: "code128",
        text: step_id,
        scale: 1,
        height: 8,
        includetext: true,
        textxalign: "center",
      });
      return canvas;
    } catch (error) {
      throw error;
    }
  };
  createCusCode(customerCode) {
    try {
      const canvas = bwipjs.toCanvas("canvasCustomer", {
        bcid: "code128",
        text: customerCode,
        scale: 1,
        height: 8,
        includetext: true,
        textxalign: "center",
      });
      return canvas;
    } catch (error) {
      throw error;
    }
  };
}
const instance = new ShareService();

export default instance;
