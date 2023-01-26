import * as express from "express";
import { RetailNS } from "./retail";
import { ContextNS } from "../ext/ctx";
import { UserAuthNS } from "../auth/auth";
import { GetAuthData, NewAuthMiddleware } from "../auth/auth.api.middleware";
import { HttpParamValidators } from "../lib/http";

export function NewOrderRetailAPI(
  retailBLL : RetailNS.BLL,
  userAuthBLL : UserAuthNS.BLL
) {
  const router = express.Router();

  router.use(NewAuthMiddleware(userAuthBLL));
  router.post("/create" , async (req,res) => {
    const ctx = ContextNS.New();
    const items = req.body.items as Array<RetailNS.CreateItemParams>;
    items.forEach(item => {
      HttpParamValidators.MustBeOneOf(item, "ref", ["product"]);
      HttpParamValidators.MustBeString(item, "ref_id")
    })
    const params : RetailNS.CreateOrderParams = {
      created_by : GetAuthData(req).user_id,
      items : items
    }
    const doc = await retailBLL.CreateOrder(ctx, params);
    res.json(doc);
  })

  router.get("/get", async (req,res) => {
    const ctx = ContextNS.New();
    if (req.query.id) {
      const id = req.query.id as string;
      const order = await retailBLL.GetOrder(ctx, id);
      return res.json(order);
    }
    if (req.query.code) {
      const code = req.query.code as string;
      const order = await retailBLL.GetOrderByCode(ctx, code);
      return res.json(order);
    }
  })
  return router;
}
