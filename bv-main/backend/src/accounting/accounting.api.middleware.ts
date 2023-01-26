import { JobNS } from "../job/job";
import { OrderNS } from "../order/order";
import { ServiceNS } from "../service/service";
import { AccountingNS } from "./accounting";
import { moneyToWord } from "../lib/export_excel";
import { GetAuthData } from "../auth/auth.api.middleware";
import { OrgNS } from "../org/org";

export const DATA_FORM = {
    index: "STT",
    full_name: "Họ tên",
    phone: "SĐT",
    [ServiceNS.Type.Exam]: "Khám",
    [ServiceNS.Type.Test]: "XN",
    [ServiceNS.Type.XRay]: "XQ",
    [ServiceNS.Type.Ultrasound]: "S.Â",
    [ServiceNS.Type.Ent]: "NSTMH",
    emergency: "DV Khác",
    [AccountingNS.TransactionType.Cash]: "Tiền mặt",
    [AccountingNS.TransactionType.Other]: "ATM",
    [JobNS.StepStatus.Cancel]: "Hủy"
}

export async function ComputeRevuene(docs: Array<any>) {
    let revuene = {
        [JobNS.StepType.Exam]: 0, [OrderNS.Type.OTCDrug]: 0, [ServiceNS.Type.Ent]: 0,
        [ServiceNS.Type.Ultrasound]: 0, [ServiceNS.Type.XRay]: 0, [ServiceNS.Type.Test]: 0, [ServiceNS.Type.Other]: 0,
        [AccountingNS.TransactionType.Cash]: 0, ["atm"]: 0, [JobNS.StepStatus.Cancel]: 0
    };
    const data = docs.map((doc, index) => {
        const obj = {
            [DATA_FORM.index]: index + 1,
            [DATA_FORM.full_name]: doc.customer.full_name,
            [DATA_FORM.phone]: doc.customer.contacts[0].phone,
            [DATA_FORM.exam]: +0,
            [DATA_FORM.test]: +0,
            [DATA_FORM["x-ray"]]: +0,
            [DATA_FORM.ultrasound]: +0,
            [DATA_FORM.ent]: +0,
            [DATA_FORM.emergency]: +0,
            [DATA_FORM.cash]: +0,
            [DATA_FORM.other]: +0,
            [DATA_FORM.cancel]: +0
        }
        const job_step_ids = [];
        doc.job_steps.forEach(d => {
            if (!job_step_ids.includes(d.id)) {
                job_step_ids.push(d.id);
                if (d.type === JobNS.StepType.Exam) {
                    revuene[JobNS.StepType.Exam] += d.amount;
                    obj[DATA_FORM.exam] += d.amount;
                    obj[DATA_FORM.cash] += d.amount;
                } else if (d.type === JobNS.StepType.Buy) {
                    revuene[OrderNS.Type.OTCDrug] += d.amount;
                } else if (d.type === JobNS.StepType.Test) {
                    if (d.service_type == ServiceNS.Type.Ent) {
                        revuene[ServiceNS.Type.Ent] += d.amount;
                        obj[DATA_FORM.ent] += d.amount;
                        obj[DATA_FORM.cash] += d.amount;
                    }
                    if (d.service_type == ServiceNS.Type.Ultrasound) {
                        revuene[ServiceNS.Type.Ultrasound] += d.amount;
                        obj[DATA_FORM.ultrasound] += d.amount;
                        obj[DATA_FORM.cash] += d.amount;
                    }
                    if (d.service_type == ServiceNS.Type.XRay) {
                        revuene[ServiceNS.Type.XRay] += d.amount;
                        obj[DATA_FORM["x-ray"]] += d.amount;
                        obj[DATA_FORM.cash] += d.amount;
                    }
                    if (d.service_type == ServiceNS.Type.Test) {
                        revuene[ServiceNS.Type.Test] += d.amount;
                        obj[DATA_FORM.test] += d.amount;
                        obj[DATA_FORM.cash] += d.amount;
                    }
                    if (d.service_type == ServiceNS.Type.Other) {
                        revuene[ServiceNS.Type.Other] += d.amount;
                        obj[DATA_FORM.emergency] += d.amount;
                        obj[DATA_FORM.cash] += d.amount;
                    }
                }
            } 
            if (d.status === JobNS.StepStatus.Cancel) {
                revuene[JobNS.StepStatus.Cancel] += d.amount;
                obj[DATA_FORM.cancel] += d.amount;
                obj[DATA_FORM.cash] -= obj[DATA_FORM.cancel]
            }
        })
        revuene[AccountingNS.TransactionType.Cash] += obj[DATA_FORM.cash];
        return obj;
    })
    // Excel colA - colK
    const money = revuene[AccountingNS.TransactionType.Cash] + revuene["atm"];
    const money_back = revuene[AccountingNS.TransactionType.Cash] - revuene["atm"];
    const total = {
        [DATA_FORM.index]: "",
        [DATA_FORM.full_name]: "",
        [DATA_FORM.phone]: "Tổng từng dv",
        [DATA_FORM.exam]: revuene[JobNS.StepType.Exam],
        [DATA_FORM.test]: revuene[ServiceNS.Type.Test],
        [DATA_FORM["x-ray"]]: revuene[ServiceNS.Type.XRay],
        [DATA_FORM.ultrasound]: revuene[ServiceNS.Type.Ultrasound],
        [DATA_FORM.ent]: revuene[ServiceNS.Type.Ent],
        [DATA_FORM.emergency]: revuene[ServiceNS.Type.Other],
        [DATA_FORM.cash]: money,
        [DATA_FORM.other]: revuene["atm"],
        [DATA_FORM.cancel]: revuene[JobNS.StepStatus.Cancel]
    }

    const transaction_type = {
        [DATA_FORM.index]: `Tiền mặt = ${revuene[AccountingNS.TransactionType.Cash] + revuene[JobNS.StepStatus.Cancel]}`,
        [DATA_FORM.exam]: `ATM = ${revuene["atm"]}`,
        [DATA_FORM.ultrasound]: `HĐ Hủy = ${revuene[JobNS.StepStatus.Cancel]}`,
    }
    const total_amount = {
        [DATA_FORM.index]: `Tổng tiền thu = ${money + revuene[JobNS.StepStatus.Cancel]}`,
    }
    const amount = {
        [DATA_FORM.index]: `Tổng tiền phải nộp = ${money_back}`,
    }
    const date = new Date().toLocaleDateString("en-gb", { day: "2-digit", month: "2-digit", year: "numeric" });
    const array_date = date.split("/");
    const date_info = {
        [DATA_FORM.index]: `Bằng chữ : ${moneyToWord(money_back)}`,
        [DATA_FORM.ent]: `Bắc Ninh, Ngày ${array_date[0]} Tháng ${array_date[1]} Năm ${array_date[2]}`,
    }
    const user_name = {
        [DATA_FORM.full_name]: "Kế toán thu ngân",
        [DATA_FORM.emergency]: "Thủ quỹ"
    }
    const info = {
        [DATA_FORM.full_name]: "(ký và ghi rõ họ tên)",
        [DATA_FORM.emergency]: "(ký và ghi rõ họ tên)"
    }
    const space_row = {};
    const footer = [total, transaction_type, total_amount, amount, date_info, user_name, info, space_row, space_row];
    data.push(...footer)
    return { revuene, data };
}

export function CompareObject(objA, objB): boolean {
    const arrA = Object.keys(objA);
    const arrB = Object.keys(objB);
    if (arrA.length !== arrB.length) {
        return false;
    }
    const result = arrA.every(k => objA[k] === objB[k]);
    return result;
}

export function FindIndexObject(array, obj): number {
    let index = -1;
    for (let i = 0; i < array.length; i++) {
        if (CompareObject(array[i], obj)) {
            index = i;
            break;
        }
    }
    return index;
}

export async function GetRoleMiddleware(req: any, orgBLL: OrgNS.BLL) : Promise<boolean> {
    const session = GetAuthData(req);
    const user = await orgBLL.GetUser(session.user_id);
    return user.roles.includes(OrgNS.Role.MANAGER);
}
