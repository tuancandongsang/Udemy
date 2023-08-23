import { CustomerNS } from "../customer/customer";
import { OrderNS } from "../order/order";
import { OrgNS } from "../org/org";
import { ServiceNS } from "../service/service";
import { ReportNS } from "./report";

export class ReportBLLBase implements ReportNS.BLL {
    constructor(
        private dal: ReportNS.DAL,
        private orgBLL: OrgNS.BLL,
        private orderBLL: OrderNS.BLL,
        private customerBLL: CustomerNS.BLL,
        private serviceBLL: ServiceNS.BLL
    ) { }

    async init() { }

    async Revenue(input: ReportNS.Revenue.Input) {
        const docs = await this.dal.Revenue(input);
        return docs;
    }

    async RevenueByUser(input: ReportNS.Revenue.Input) {
        const docs = await this.dal.RevenueByUser(input);
        for (const d of docs) {
            d.user = await this.orgBLL.GetUser(d.user_id);
        }
        return docs;
    }

    async Service(input: ReportNS.Service.Input) {
        const docs = await this.dal.Service(input);
        return docs;
    }

    async ServiceType(input: ReportNS.Service.Input) {
        const docs = await this.dal.ServiceType(input);
        if (input.type) {
            return docs.filter(d => d.type === input.type)
        }
        return docs;
    }
}
