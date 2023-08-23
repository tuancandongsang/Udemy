import { ReadConfig } from "./config";
import * as express from "express";
import * as WebSocket from "ws";
import * as http from "http";
import * as StatusMonitor from "express-status-monitor";
import "./lib/express";
import "./ext/log";
import * as cors from "cors";
import { UserAuthDALMongo } from "./auth/auth.dal.mongo";
import { UserAuthBLLBase } from "./auth/auth.bll.base";
import { NewAuthAPI } from "./auth/auth.api";
import { CustomerDALMongo } from "./customer/customer.dal.mongo";
import { CustomerBLLBase } from "./customer/customer.bll.base";
import { NewCustomerAPI } from "./customer/customer.api";

import { NewAccountingAPI } from "./accounting/accounting.api";
import { AccountingBLLBase } from "./accounting/accounting.bll.base";
import { AccountingDALMongo } from "./accounting/accounting.dal.mongo";

import { NewServiceAPI } from './service/service.api';
import { ServiceBLLBase } from './service/service.bll.base'
import { ServiceDALMongo } from './service/service.dal.mongo';

import { NewOrgAPI } from "./org/org.api";
import { OrgBLLBase } from "./org/org.bll.base";
import { OrgDALMongo } from "./org/org.dal.mongo";

import { NewOrderAPI } from "./order/order.api";
import { OrderDALMongo } from "./order/order.dal.mongo";
import { OrderBLLBase } from "./order/order.bll.base";

import { JobDALMongo } from "./job/job.dal.mongo";
import { JobBLLBase } from "./job/job.bll.base";
import { NewJobAPI } from "./job/job.api";

import { NewLocationAPI } from "./location/location.api";
import { LocationBLLBase } from "./location/location.bll.base";
import { LocationDALMongo } from "./location/location.dal.mongo";

import { NewProductAPI } from './product/product.api';
import { ProductBLLBase } from './product/product.bll.base';
import { ProductDALMongo } from './product/product.dal.mongo';
import { MongoCommon } from "./lib/mongodb";
import { ContextBLLBase } from "./ext/ctx.bll";
import { EventBLLBase } from "./ext/ev.bll";

import { ChangeKeysObjs, NewInventoryAPI } from './inventory/inventory.api';
import { InventoryBLLBase } from './inventory/inventory.bll.base';
import { InventoryDALMongo } from './inventory/inventory.dal.mongo';

import { RegionDALMongo } from "./region/region.dal.mongo";
import { RegionBLLBase } from "./region/region.bll.base";
import { NewAPIRegion } from "./region/region.api";

import { NewAPIReport } from "./report/report.api";
import { ReportDALMongo } from "./report/report.dal.mongo";
import { ReportBLLBase } from "./report/report.bll.base";

import { RetailDALMongo } from "./retail/retail.dal.mongo";
import { RetailBLLBase } from "./retail/retail.bll.base";
import { NewOrderRetailAPI } from "./retail/retail.api";

import { SampleDALMongo } from "./sample/sample.dal.mongo";
import { SampleBLLBase } from "./sample/sample.bll.base";
import { NewSampleAI } from "./sample/sample.api";

import { UploadDALMongo } from "./upload/upload.dal.mongo";
import { UploadBLLBase } from "./upload/upload.bll.base";
import { NewAPIUpload } from "./upload/upload.api";

import { ConsumableDALMongo } from "./consumable/consumable.dal.mongo";
import { ConsumableBLLBase } from "./consumable/consumable.bll.base";
import { NewConsumableAPI } from "./consumable/consumable.api";

import { HttpErrorHandler } from "./common/http_errror_handler";
import { RegisterGlobalEventHandlers } from "./common/global_ev_handlers";
import { ExpressStaticFallback } from "./lib/express";
import { Worker } from "./lib/cluster";

export async function main() {
  const config = await ReadConfig();
  console.log(config);
  const client = await MongoCommon.Connect(config.database.db_url, { replica: true });
  console.log('connected to database');
  const database = client.db(config.database.db_name);
  /******************************************************* */
  const contextBLL = new ContextBLLBase(client);
  const eventBLL = new EventBLLBase(database, contextBLL);
  await eventBLL.init();

  // customer
  const customerDAL = new CustomerDALMongo(database);
  await customerDAL.init();
  const customerBLL = new CustomerBLLBase(customerDAL);
  await customerBLL.init();
  // org
  const orgDAL = new OrgDALMongo(database);
  await orgDAL.init();
  const orgBLL = new OrgBLLBase(orgDAL);
  await orgBLL.init();
  // auth
  const userAuthDAL = new UserAuthDALMongo(database);
  await userAuthDAL.init();
  const userAuthBLL = new UserAuthBLLBase(userAuthDAL, orgBLL);
  await userAuthBLL.init();

  // service
  const serviceDAL = new ServiceDALMongo(database);
  await serviceDAL.init();
  const serviceBLL = new ServiceBLLBase(serviceDAL);
  await serviceBLL.init();

  // location
  const locationDAL = new LocationDALMongo(database);
  await locationDAL.init();
  const locationBLL = new LocationBLLBase(locationDAL, serviceBLL);
  await locationBLL.init();
  // product
  const productDAL = new ProductDALMongo(database);
  await productDAL.init();
  const productBLL = new ProductBLLBase(productDAL);
  await productBLL.init();
  // order
  const orderDAL = new OrderDALMongo(database);
  await orderDAL.init();
  const orderBLL = new OrderBLLBase(
    orderDAL, contextBLL, eventBLL,
    serviceBLL, customerBLL, productBLL
  );
  await orderBLL.init();

  //upload
  const uploadDAL = new UploadDALMongo(database);
  await uploadDAL.init();
  const uploadBLL = new UploadBLLBase(uploadDAL);
  await uploadBLL.init();

  // job
  const jobDAL = new JobDALMongo(database);
  await jobDAL.init();
  const jobBLL = new JobBLLBase(jobDAL, contextBLL, locationBLL, customerBLL, serviceBLL, orderBLL, uploadBLL);
  await jobBLL.init();

  //retail
  const retailDAL = new RetailDALMongo(database);
  await retailDAL.init();
  const retailBLL = new RetailBLLBase(retailDAL, contextBLL, productBLL);
  await retailBLL.init();

  //consumable
  const consumableDAL = new ConsumableDALMongo(database);
  await consumableDAL.init();
  const consumableBLL = new ConsumableBLLBase(consumableDAL, productBLL);

  // inventory
  const inventoryDAL = new InventoryDALMongo(database);
  await inventoryDAL.init();
  const inventoryBLL = new InventoryBLLBase(inventoryDAL, contextBLL, productBLL, orderBLL, orderDAL, retailBLL, retailDAL, jobBLL, consumableBLL);
  await inventoryBLL.init();

  // accounting
  const accountingDAL = new AccountingDALMongo(database);
  await accountingDAL.init();
  const accountingBLL = new AccountingBLLBase(accountingDAL, contextBLL, orderBLL, retailBLL, orgBLL, jobBLL, customerBLL, inventoryBLL, serviceBLL);
  await accountingBLL.init();

  //region
  const regionDAL = new RegionDALMongo(database);
  await regionDAL.init();
  const regionBLL = new RegionBLLBase(regionDAL);
  await regionBLL.init();

  //report
  const reportDAL = new ReportDALMongo(database);
  await reportDAL.init();
  const reportBLL = new ReportBLLBase(reportDAL, orgBLL, orderBLL, customerBLL, serviceBLL);
  await reportBLL.init();

  //sample
  const sampleDAL = new SampleDALMongo(database);
  await sampleDAL.init();
  const sampleBLL = new SampleBLLBase(sampleDAL, jobBLL, orderBLL, orgBLL, contextBLL);
  await sampleBLL.init();
  /******************************************************* */

  /****************************************************** */
  const app = express();
  app.disable("x-powered-by");
  app.use(cors());
  app.use(express.json());
  app.use(StatusMonitor())
  /****************************************************** */
  const server = http.createServer(app);
  const wsServer = new WebSocket.Server({ server });
  /****************************************************** */
  app.use('/api/auth/', NewAuthAPI(userAuthBLL));
  app.use("/api/org", NewOrgAPI(userAuthBLL, orgBLL))
  app.use('/api/service', NewServiceAPI(serviceBLL));
  app.use("/api/customer/", NewCustomerAPI(customerBLL));
  app.use("/api/order", NewOrderAPI(userAuthBLL, orderBLL, jobBLL, orgBLL));
  app.use('/api/location/', NewLocationAPI(locationBLL));
  app.use('/api/product/', NewProductAPI(userAuthBLL, productBLL));
  app.use("/api/job", NewJobAPI(userAuthBLL, jobBLL, serviceBLL, wsServer));
  app.use('/api/inventory/', NewInventoryAPI(userAuthBLL, inventoryBLL, orgBLL));
  app.use('/api/accounting', NewAccountingAPI(userAuthBLL, accountingBLL, orgBLL));
  app.use("/api/region/", NewAPIRegion(regionBLL));
  app.use("/api/report/", NewAPIReport(reportBLL));
  app.use("/api/retail", NewOrderRetailAPI(retailBLL, userAuthBLL));
  app.use("/api/sample", NewSampleAI(sampleBLL, userAuthBLL));
  app.use("/api/consumable", NewConsumableAPI(consumableBLL));
  app.use("/api/data", NewAPIUpload(uploadBLL));
  /****************************************************** */
  app.use("/", ExpressStaticFallback(config.app.dir));
  app.use(HttpErrorHandler);
  
  console.log(`listen on ${config.server.port}`);
  server.listen(config.server.port, "0.0.0.0", () => {
    const err = arguments[0];
    if (err) {
      console.log(err);
    }
  });
  /****************************************************** */
  RegisterGlobalEventHandlers(
    eventBLL, orderBLL, jobBLL, inventoryBLL, wsServer
  );
}

const isSetup = process.argv[2] === 'setup';

if (isSetup) {
  console.log('in setup mode');
  require('./setup/setup').SetupSampleData().catch(console.log);
} else {
  main().catch(err => console.log(err));
  // Worker(main)
}


