import { Http } from "../../Helper/Http";

const addCm_eP = "/customer/customer/create";
const addCmContact_eP = "/customer/contact/create";
const modifyCm_eP = "/customer/customer/update";
const modifyCmContact_eP = "/customer/contact/update";
const getCmByPhone_eP = "/customer/customer/search";

export const getCmByPhone = async phone_number =>
  (await Http.post(getCmByPhone_eP, { phone_number })).data;

export const addCm = async customer =>
  (await Http.post(addCm_eP, customer)).data;

export const addCmContact = async customer_contact =>
  (await Http.post(addCmContact_eP, customer_contact)).data;

export const modifyCm = async customer =>
  (await Http.post(modifyCm_eP, customer)).data;

export const modifyCmContact = async customer_contact =>
  (await Http.post(modifyCmContact_eP, customer_contact)).data;
