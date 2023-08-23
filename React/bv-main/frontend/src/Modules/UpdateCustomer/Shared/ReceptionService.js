import { Http } from '../../../Helper/Http'
class ReceptionService {
    constructor() {
        if (ReceptionService._instance) {
            return ReceptionService._instance
        }
        ReceptionService._instance = this;
    }

    getJobByCustomerId(customer_id) {
        return Http.get(`/job/job/list`, { customer_id })
    }
    getBookList(status) {
        return Http.get(`/accounting/book/list`, { status });
    }
    getOrder(code) {
        return Http.get(`/order/order/get`, { code });
    }
    postTransaction(payload) {
        return Http.post(`/accounting/transaction/create`, payload);
    }
    getServiceList(){
        return Http.get(`/service/service/list`)
    }
    getLocationAllCity(type, parent_id) {
        return Http.get(`/region/region/list`, { type, parent_id })
    }
    getLocationAllDistrict(type, parent_id) {
        return Http.get(`/region/region/list`, { type, parent_id })
    }
    getLocationAllWard(type, parent_id) {
        return Http.get(`/region/region/list`, { type, parent_id })
    }
    postAddress(customer_id) {
        return Http.post(`/customer/contact/add`, customer_id)
    }
    postJob(job) {
        return Http.post(`/job/job/customer/service`, job)
    }
    postJobTest(job){
        return Http.post(`/job/job/customer/test`, job)
    }
    getAllLocation(){
        return Http.get(`/location/list`)
    }
    getRetailOrder(code) {
        return Http.get(`/retail/get`, { code })
    }
    getCmbyCode(code) {
        return Http.get(`/customer/customer/get`, { code })
    }

    getContactByCmId(customer_id) {
        return Http.get(`/customer/contact/get`, { customer_id })
    }

    getLocationByService(serviceId) {
        return Http.get(`/location/service/location`, { id: serviceId })
    }

    getCmList(payload) {
        return Http.get(`/customer/customer/list`, payload)
    }

    getExamHistory(customer_id,type) {
        return Http.get(`/job/job/list`, { customer_id,type })
    }
    getExamHistoryWithType(customer_id, type) {
        return Http.get(`/job/job/list`, { customer_id, type })
    }
    getJobStepList(location_id,status,type){
        return Http.get(`/job/step/list`,{location_id,status,type})
    }

    getJobById(id) {
        return Http.get(`/job/job/get`, { id })
    }

    searchCustomer(text) {
        return Http.get(`/customer/customer/search`, { text })
    }
}

const instance = new ReceptionService();

export default instance;