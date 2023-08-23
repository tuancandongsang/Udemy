import { ReportNS } from "./report";
import { ServiceNS } from "../service/service";
import { getAge, splitRegion } from "../lib/export_excel";
export const SERVICE_TYPE_VN = {
    [ServiceNS.Type.Exam]: "Khám",
    [ServiceNS.Type.Test]: "Xét nghiệm",
    [ServiceNS.Type.Ultrasound]: "Siêu âm",
    [ServiceNS.Type.XRay]: "X-Quang",
    [ServiceNS.Type.Ent]: "Nội soi",
    [ServiceNS.Type.Other]: "Cấp cứu"
}

export const TITLE = {
    TIME: "Thời gian",
    SERVICE_TYPE: "Loại dịch vụ",
    AMOUNT: "Số lượng",
    TOTAL: "Tổng tiền",
    INDEX: "STT"
}

export async function ComputeReportByService(array: ReportNS.Service.Output[], type: ServiceNS.Type) {
    const service_types = Object.values(ServiceNS.Type);
    let total = +0;
    if (type) {
        const aoa_data = array.map(record => {
            total += record.total;
            const obj = {
                [TITLE.TIME] : record.time,
                [TITLE.SERVICE_TYPE] : SERVICE_TYPE_VN[type],
                [TITLE.AMOUNT] : record.count,
                [TITLE.TOTAL] : record.total
            }
            return Object.values(obj);
        })
        return aoa_data;
    }
    const aoa_data = service_types.map((type, index) => {
        let count = +0;
        let total = +0;
        for (let output of array) {
            if (type === output.type) {
                count += output.count;
                total += output.total;
            }
        }
        const obj = {
            [TITLE.INDEX] : index + 1,
            [TITLE.SERVICE_TYPE] : SERVICE_TYPE_VN[type],
            [TITLE.AMOUNT] : count,
            [TITLE.TOTAL] : total
        };
        const values = Object.values(obj);
        return values;
    })
    return aoa_data;
}

/**************************************************************************************/
export const TITLE_BY_DAY = {
    TIME: "Thời gian",
    FULL_NAME: "Tên bệnh nhân",
    CODE: "Mã bệnh nhân",
    AGE: "Tuổi",
    PHONE: "SĐT",
    ADDRESS: "Địa chỉ",
    SERVICE_NAME: "Tên dịch vụ",
    TOTAL: "Tổng tiền thu"
}

export async function ComputeReportByServiceID(array: ReportNS.Service.OutputByService[]) {
    const aoa_data = array.map(obj => {
        const address = obj.customer.contacts[0].address
        return [
            obj.time,
            obj.customer.full_name,
            obj.customer.code,
            getAge(obj.customer.birthday),
            obj.customer.contacts[0].phone,
            `${splitRegion(address.ward)}-${splitRegion(address.district)}-${splitRegion(address.province)}`, 
            obj.service.name,
            obj["amount"]
        ]
    })
    return aoa_data;
}