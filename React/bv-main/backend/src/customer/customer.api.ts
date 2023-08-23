import * as express from "express";
import { HttpError, HttpParamValidators } from "../lib/http";
import { CustomerNS } from "./customer";

export function NewCustomerAPI(
  customerBLL: CustomerNS.BLL
) {
  const router = express.Router();
  const gender_values = Object.values(CustomerNS.Gender);
  const id_type_values = Object.values(CustomerNS.IDType);

  router.post("/customer/create", async (req, res) => {
    const params: CustomerNS.CreateCustomerParams = {
      full_name: HttpParamValidators.MustBeString(req.body, "full_name", 3),
      gender: HttpParamValidators.MustBeOneOf(req.body, "gender", gender_values),
      birthday: HttpParamValidators.MustBeString(req.body, "birthday", 2),
      code: HttpParamValidators.MustBeString(req.body, "code", 12),
    };
    const customer = await customerBLL.CreateCustomer(params);
    res.json(customer);
  });

  router.get("/customer/list", async (req, res) => {
    const query: CustomerNS.QueryCustomerParams = req.query;
    const docs = await customerBLL.ListCustomer(query);
    res.json(docs);
  });

  router.post("/customer/delete", async (req, res) => {
    const id = req.query.id as string;
    const doc = await customerBLL.DeleteCustomer(id);
    res.json(doc);
  });

  router.post("/customer/update", async (req, res) => {
    const customer_id = HttpParamValidators.MustBeString(req.body, "id");
    const params: CustomerNS.UpdateCustomerParams = {
      birthday: HttpParamValidators.MustBeString(req.body, 'birthday', 2),
      gender: HttpParamValidators.MustBeOneOf(req.body, 'gender', gender_values),
      full_name: HttpParamValidators.MustBeString(req.body, 'full_name', 2),
    };
    await customerBLL.UpdateCustomer(customer_id, params);
    res.json(1);
  });

  router.get("/customer/get", async (req, res) => {
    let id = req.query.id as string;
    const code = req.query.code as string;
    if (!id && !code) {
      throw new HttpError(`id or code is required`, 400);
    }
    if (!id) {
      const customer = await customerBLL.GetCustomerByCode(code);
      id = customer.id;
    }
    const view_customer = await customerBLL.ViewCustomer(id);
    res.json(view_customer);
  });

  router.post("/customer/allergy" , async (req,res) => {
    let id = req.query.id as string;
    const params = {
      allergy : req.body.allergy
    }
    await customerBLL.UpdateAllergy(id, params);
    res.json(1);
  })

  router.post("/contact/:action(add|update)", async (req, res) => {
    const params: CustomerNS.UpdateContactParams = req.body;
    if (params.idnum) HttpParamValidators.MustBeOneOf(req.body, "idtype", id_type_values);
    const { action } = req.params;
    if (action === 'update') {
      const id = req.body.id;
      await customerBLL.UpdateContact(id, params);
      res.json(1);
    } else if (action === 'add') {
      const customer_id = HttpParamValidators.MustBeString(req.body, "customer_id", 8);
      const create_params: CustomerNS.CreateContactParams = {
        ...params,
        customer_id,
      };
      const contact = await customerBLL.CreateContact(create_params);
      res.json(contact);
    }
  });

  router.get("/customer/search", async (req, res) => {
    const text = req.query.text as string;
    const docs = await customerBLL.SearchCustomer(text);
    res.json(docs);
  });

  router.post("/contact/remove", async (req, res) => {
    const doc = await customerBLL.DeleteContact(
      req.body.id as string
    );
    res.json(doc);
  });


  router.post("/visit/create", async (req, res) => {
    const customer_id = HttpParamValidators.MustBeString(req.body,"customer_id",3);
    const customerContact = await customerBLL.AddVisit(customer_id);
    res.json(customerContact);
  });

  router.get("/visit/get", async (req, res) => {
    const customer_id = req.query.customer_id as string;
    const docs = await customerBLL.ListVisit(customer_id);
    res.json(docs);
  });

  return router;
}
