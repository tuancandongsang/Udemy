import { Http } from '../../../Helper/Http';
import UtilService from '../../../Shared/Services/UtilService';

const API_ENDPOINT = {
    addCm: "/customer/customer/create",
    addCmContact: "/customer/contact/add",
    modifyCm: "/customer/customer/update",
    modifyCmContact: "/customer/contact/update",
    getCmByPhone: "/customer/customer/search"
}

class CustomerService extends UtilService {
    constructor() {
        super()
        if (CustomerService._instance) {
            return CustomerService._instance
        }
        CustomerService._instance = this;
    }

    getCmByPhone = async phone_number =>
        (await Http.post(API_ENDPOINT.getCmByPhone, {phone_number})).data
    

    addCm = async customer => 
        (await Http.post(API_ENDPOINT.addCm, customer)).data

    addCmContact = async customer_contact => 
        (await Http.post(API_ENDPOINT.addCmContact, customer_contact)).data

    modifyCm = async customer => 
        (await Http.post(API_ENDPOINT.modifyCm, customer)).data
    

    modifyCmContact = async customer_contact =>
        (await Http.post(API_ENDPOINT.modifyCmContact, customer_contact)).data

    
}

const instance = new CustomerService();

export default instance;