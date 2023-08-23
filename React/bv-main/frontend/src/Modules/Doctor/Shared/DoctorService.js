import { LOCALSTORAGE } from "../../../Constances/const";
import { Http } from "../../../Helper/Http";

const API_ENDPOINT = {
  //////// customer ////////////////
  GETLISTCUSTOMER: "/job/step/list?location_id=",
  GETLISTSERVICES: "/service/service/list",
  GETONECUSTOMER: "/customer/customer/get?id=",
  GETLISTLOCATION: "/location/list",
  GETLOCATIONBYSERVICE: "/location/service/location",
  GETLISTPRODUCT: "/product/list",
  GET_JOB_BY_ID: "/job/job/get",
  GET_CUSTOMER_BY_CODE : "/customer/customer/get?code=",

  POST_ALLERGY_TO_CUS : "/customer/customer/allergy?id=",

  POSTUPDATECUSTOMER: "/customer/customer/update",
  ADD_JOB_STEP: "/job/step/add",
  POSTDIAGNOSIS: "/job/step/finish",
  POSTSUBCLINICAL: "/job/job/state",
  UPDATE_JOB_STEP: "/job/step/update",
  GET_JOB: '/job/job/list?customer_id=',
  GET_SERVICE_POLICY : "/service/policy/get?id=",
  //Doctor Infor

  GET_LIST_DOCTOR : '/org/user/list'
};

class DoctorServices {
  constructor() {
    if (DoctorServices._instance) {
      return DoctorServices._instance;
    }
    DoctorServices._instance = this;
  }

  get location() {
    return JSON.parse(sessionStorage.getItem(LOCALSTORAGE.LOCATION) || '{}');
  }

  set location(data) {
    sessionStorage.setItem(LOCALSTORAGE.LOCATION, JSON.stringify(data))
  }

  ///////////////// API USER ///////////////////
  // get data
  // getListCustomer(id) {
  //   return Http.get(API_ENDPOINT.GETLISTCUSTOMER + id);
  // }
  getOneCustomer(id) {
    return Http.get(API_ENDPOINT.GETONECUSTOMER + id);
  }
  getCustomerByCode(id) {
    return Http.get(API_ENDPOINT.GET_CUSTOMER_BY_CODE + id);
  }
  getListServices() {
    return Http.get(API_ENDPOINT.GETLISTSERVICES);
  }

  postUpdateCustomer() {
    return Http.post(API_ENDPOINT.POSTUPDATECUSTOMER);
  }
  postAllergyToCus(id, data) {
    return Http.post(API_ENDPOINT.POST_ALLERGY_TO_CUS + id, data);
  }
  //post diagnostic - yeucau kham benh
  addJobStep(data) {
    return Http.post(API_ENDPOINT.ADD_JOB_STEP, data);
  }
  finishDiagnosis(data) {
    return Http.post(API_ENDPOINT.POSTDIAGNOSIS, data);
  }
  updateJobStep(data) {
    return Http.post(API_ENDPOINT.UPDATE_JOB_STEP, data)
  }
  ///////////////// API LOCATION ///////////////////
  // get location
  getListLocation() {
    return Http.get(API_ENDPOINT.GETLISTLOCATION);
  }

  getLocationsByService(serviceId) {
    return Http.get(`${API_ENDPOINT.GETLOCATIONBYSERVICE}?id=${serviceId}`);
  }
  ////////////// API PRODUCT ///////////////
  getListProduct() {
    return Http.get(API_ENDPOINT.GETLISTPRODUCT);
  }
  getInfoService(id) {
    return Http.get(API_ENDPOINT.GETINFOSERVICE + id);
  }
  ////////// API SUBCLINICAL
  postSubclinical(data) {
    return Http.post(API_ENDPOINT.POSTSUBCLINICAL, data)
  }

  //GET JOB BY ID
  getJobById = async (id) => {
    return (await Http.get(API_ENDPOINT.GET_JOB_BY_ID, id)).data
  }
  searchCustomer(text) {
    return Http.get(`/customer/customer/search`, { text })
  }
  getJob(customerId){
    return Http.get(API_ENDPOINT.GET_JOB + customerId);
  }
  getServicePolicy(id){
     return Http.get(API_ENDPOINT.GET_SERVICE_POLICY + id)
  }
  //GET DOCTOR INFOR
  listDoctor() {
    return Http.get(API_ENDPOINT.GET_LIST_DOCTOR);
  }
}
const instance = new DoctorServices();

export default instance;
