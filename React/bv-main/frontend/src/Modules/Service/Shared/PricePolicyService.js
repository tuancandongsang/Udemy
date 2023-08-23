import { Http } from "../../../Helper/Http"
const API_ENDPOINT = {
    BASE: '/service/policy',
}

class PricePolicyService {
    constructor() {
        if (PricePolicyService._instance) {
            return PricePolicyService._instance
        }
        PricePolicyService._instance = this;

        // ... Your rest of the constructor code goes after this

    }

    postPricePolicy(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/create`, payload)
    }
    getPricePolicyList() {
        return Http.get(`${API_ENDPOINT.BASE}/list`)
    }
    getPricePolicyById(id) {
        return Http.get(`${API_ENDPOINT.BASE}/get`, { id })
    }
    delPricePolicy(id) {
        return Http.post(`${API_ENDPOINT.BASE}/delete`, { id })
    }
    editPricePolicy(payload) {
        return Http.post(`${API_ENDPOINT.BASE}/update`, payload)
    }
}

const instance = new PricePolicyService();

export default instance;