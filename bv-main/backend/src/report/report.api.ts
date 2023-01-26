import { endOfDay, startOfDay, subDays, subMonths, format } from "date-fns";
import * as express from "express";
import { ExportExcelReportByService, moneyToWord, removeVietnameseTones } from "../lib/export_excel";
import { HttpParamValidators } from "../lib/http";
import { ServiceNS } from "../service/service";
import { ReportNS } from "./report";
import { ComputeReportByService, ComputeReportByServiceID, TITLE, TITLE_BY_DAY } from "./report.api.middleware";

const valid_intervals = new Set(Object.values(ReportNS.Interval));

function GetTimeRange(query: any): {
    interval: ReportNS.Interval,
    time: [number, number]
} {
    const now = new Date();
    let { interval, min_time, max_time } = query;
    console.log(query);

    // default interval
    if (!valid_intervals.has(interval)) {
        interval = "day";
    }

    min_time = new Date(min_time);
    // default min_time 
    if (isNaN(min_time)) {
        if (interval === "month") {
            min_time = subMonths(now, 12).getTime();
        } else {
            min_time = subDays(now, 30).getTime();
        }
    }
    
    max_time = new Date(max_time);
    // default max_time
    if (isNaN(max_time)) {
        max_time = endOfDay(now).getTime();
    }
    return { interval, time: [min_time, max_time] };
}

function ConvertTimeRange(query: any): {
    interval: ReportNS.Interval,
    time: [number, number]
} { 
    const now = Date.now();
    const input: ReportNS.Service.Input = {
        interval : ReportNS.Interval.Day,
        time: [
            startOfDay(now).getTime(),
            endOfDay(now).getTime()
        ]
    }
    if (query.start_date) input.time[0] = startOfDay(new Date(query.start_date).getTime()).getTime()
    if (query.end_date) input.time[1] = endOfDay(new Date(query.end_date).getTime()).getTime()
    if (query.interval === ReportNS.Interval.Month) {
        input.interval = query.interval;
        // input.time = [
        //     startOfYear(Date.now()).getTime(),
        //     endOfYear(Date.now()).getTime()
        // ]
        input.time = [
            subMonths(now, 12).getTime(),
            now
        ]
    }
    return input;
}

export function NewAPIReport(
    reportBLL: ReportNS.BLL
) {
    const router = express.Router();
    const services_type = Object.values(ServiceNS.Type);

    router.get("/revenue", async (req, res) => {
        const group_by = req.query.group_by as any;
        const time_range = GetTimeRange(req.query);
        let docs = [];
        const input: ReportNS.Revenue.Input = {
            ...time_range,
        };
        if (group_by === "user") {
            docs = await reportBLL.RevenueByUser(input);
        } else {
            docs = await reportBLL.Revenue(input);
        }
        return res.json(docs);
    });

    router.get("/service/export-excel", async (req,res) => {
        const time_range = ConvertTimeRange(req.query);
        const input: ReportNS.Service.Input = {
            ...time_range,
        };
        let docs = [];
        const year = format(Date.now(), "yyyy")
        const space_cell = "";
        let headers = [ TITLE.INDEX, TITLE.SERVICE_TYPE, TITLE.AMOUNT, TITLE.TOTAL ]
        let title = [space_cell, space_cell, `THỐNG KÊ DỊCH VỤ NĂM ${year}`];
        let file_name = `Thong ke dich vu nam ${year}`;
        let signature = [space_cell, space_cell, "Tổng"]
        //export with service_id
        if (req.query.service_id) {
            input.service_id = HttpParamValidators.MustBeString(req.query, "service_id", 6); 
            docs = await reportBLL.Service(input);
            const result = await ComputeReportByServiceID(docs);
            title = [space_cell, space_cell, `THỐNG KÊ DỊCH VỤ ${result[0][6].toUpperCase()}`]
            headers = [TITLE_BY_DAY.TIME, TITLE_BY_DAY.FULL_NAME, TITLE_BY_DAY.CODE, TITLE_BY_DAY.AGE, TITLE_BY_DAY.PHONE,
                TITLE_BY_DAY.ADDRESS, TITLE_BY_DAY.SERVICE_NAME, TITLE_BY_DAY.TOTAL];
            const total = docs.length > 0 ? docs.reduce((total,obj) => total += obj["amount"], +0) : +0;
            const file_name = `${removeVietnameseTones(result[0][6])}`;
            signature = [space_cell, space_cell, space_cell, space_cell, space_cell, "Tổng", `${docs.length}`, `${total}`];
            const data = [title, headers, ...result, signature];
            return ExportExcelReportByService(req, res, data, file_name);
        } 
        
        const total = docs.reduce((total, obj) => {
            return total += obj.total;
        },0)
        const result = await ComputeReportByService(docs, input.type);
        const money = ["Bằng chữ: ",moneyToWord(+total)];
        const data = [title, headers, ...result, signature, money];
        return ExportExcelReportByService(req, res, data, file_name);
    })

    router.get("/service", async (req,res) => {
        const time_range = ConvertTimeRange(req.query);
        const input: ReportNS.Service.Input = {
            ...time_range,
        };
        if (req.query.type) input.type = HttpParamValidators.MustBeOneOf(req.query, "type", services_type);
        let docs = [];
        if (req.query.service_id) {
            input.service_id = HttpParamValidators.MustBeString(req.query, "service_id", 6); 
            docs = await reportBLL.Service(input);
        } else {
            docs = await reportBLL.ServiceType(input);
        }
        res.json(docs);
    })

    return router;
}