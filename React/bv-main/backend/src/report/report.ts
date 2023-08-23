import { CustomerNS } from "../customer/customer";
import { OrderNS } from "../order/order";
import { OrgNS } from "../org/org";
import { ServiceNS } from "../service/service";

export namespace ReportNS {
   export enum Interval {
      Day = "day",
      Month = "month",
      Year = "year"
   }

   export namespace Revenue {
      export interface Input {
         time: [number, number];
         interval: Interval;
      }

      export interface Output {
         time: string;
         amount: number;
      }

      export interface InputByUser extends Input {

      }

      export interface OutputByUser extends Output {
         user_id: string;
         user?: OrgNS.User;
      }
   }

   export namespace Service {
      export interface Input {
         time: [number, number];
         interval: Interval;
         type?: ServiceNS.Type;
         service_id?: string;
      }

      export interface Output {
         time: string;
         type : ServiceNS.Type;
         count: number; // so luong
         total: number; // tong tien
      }

      export interface OutputByService {
         time: string;
         count: number; // so luong
         total: number; // tong tien
         service_id: string; 
         service?: ServiceNS.Service,
         customer?: CustomerNS.ViewCustomer
      }
   }
   export interface BLL {
      Revenue(input: Revenue.Input): Promise<Revenue.Output[]>;
      RevenueByUser(input: Revenue.InputByUser): Promise<Revenue.OutputByUser[]>;
      
      ServiceType(input: Service.Input): Promise<Service.Output[] | Service.OutputByService[]>;
      Service(input: Service.Input): Promise<Service.OutputByService[]>;
   }

   export interface DAL {
      Revenue(input: Revenue.Input): Promise<Revenue.Output[]>;
      RevenueByUser(input: Revenue.InputByUser): Promise<Revenue.OutputByUser[]>;

      ServiceType(input: Service.Input): Promise<Service.Output[]>;
      Service(input: Service.Input): Promise<Service.OutputByService[]>;
   }
}