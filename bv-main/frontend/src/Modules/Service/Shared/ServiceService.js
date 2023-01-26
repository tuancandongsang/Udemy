import { Http } from "../../../Helper/Http";
const API_ENDPOINT = {
    BASE: '/service/service',
    GET_LIST_LOCATION: '/location/list',
    GET_LOCATION_SERVICE: '/location/service/location?id=',
    ADD_STEP_SERVICE: '/service/step/create',
    DELETE_STEP_SERVICE: '/service/step/delete',
    ADD_LOCATION_SERVICE: '/location/service/add',
    REMOVE_LOCATION_SERVICE: '/location/service/remove',
    UPDATE_STEP_SERVICE: '/service/step/update',

    GET_LIST_POLICY: "service/policy/list",
    UPDATE_PRICE_SERVICE: "/service/service/update",
    UPDATE_DISCOUNT_PRICE: "/service/service/discount",
    GET_LIST_MATERIAL:"/consumable/list"
}

class ServiceService {
    constructor() {
        if (ServiceService._instance) {
            return ServiceService._instance
        }
        ServiceService._instance = this;

        // ... Your rest of the constructor code goes after this

    }

    // service service
    postService(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/create`, payload)
    }
    getServiceList(type) {
        if (type) {
            return Http.get(`${API_ENDPOINT.BASE}/list?type=${type}`)
        }
        return Http.get(`${API_ENDPOINT.BASE}/list`)
    }
    getServiceById(id) {
        return Http.get(`${API_ENDPOINT.BASE}/get`, { id })
    }
    delService(id) {
        return Http.post(`${API_ENDPOINT.BASE}/delete`, { id })
    }
    editService(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/update`, payload)
    }
    getListLocation() {
        return Http.get(API_ENDPOINT.GET_LIST_LOCATION)
    }
    getLocationService(service_id) {
        return Http.get(API_ENDPOINT.GET_LOCATION_SERVICE + service_id)
    }
    addStepService(data) {
        return Http.post(API_ENDPOINT.ADD_STEP_SERVICE, data)
    }
    deleteStepService(data) {
        return Http.post(API_ENDPOINT.DELETE_STEP_SERVICE, data)
    }
    addLocationService(data) {
        return Http.post(API_ENDPOINT.ADD_LOCATION_SERVICE, data)
    }
    updateStepService(data) {
        return Http.post(API_ENDPOINT.UPDATE_STEP_SERVICE, data)
    }
    removeLocationService(data) {
        return Http.post(API_ENDPOINT.REMOVE_LOCATION_SERVICE, data)
    }
    updatePriceDiscount(data) {
        return Http.post(API_ENDPOINT.UPDATE_DISCOUNT_PRICE, data)
    }
    updatePriceService(data) {
        return Http.post(API_ENDPOINT.UPDATE_PRICE_SERVICE, data)
    }
    getListPolicy() {
        return Http.get(API_ENDPOINT.GET_LIST_POLICY)
    }
    getListMaterial(){
        return Http.get(API_ENDPOINT.GET_LIST_MATERIAL)
    }
}

const instance = new ServiceService();

export default instance;