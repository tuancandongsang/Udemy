import { MongoDB } from "../lib/mongodb";
import { ReportNS } from "./report";
import { OrderNS } from "../order/order";
import { format } from "date-fns";
import { JobNS } from "../job/job";

const TimeFormats = {
    [ReportNS.Interval.Month]: "%Y-%m",
    [ReportNS.Interval.Day]: "%Y-%m-%d",
}

function GroupByTime(field: string, interval: ReportNS.Interval) {
    return {
        $dateToString: {
            date: { $toDate: '$ctime' },
            format: TimeFormats[interval],
        }
    };
}

export class ReportDALMongo implements ReportNS.DAL {
    constructor(private db: MongoDB) { }

    async init() { }

    private col_accounting_transaction = this.db.collection("accounting_transaction");

    async Revenue(input: ReportNS.Revenue.Input) {
        const [min, max] = input.time;
        const $match = { ctime: { $gte: min, $lte: max } };
        const $group = {
            _id: GroupByTime("$ctime", input.interval),
            amount: { $sum: '$amount' }
        };
        const docs = await this.col_accounting_transaction.aggregate([
            { $match },
            { $group },
            {
                $project: {
                    _id: 0,
                    time: "$_id",
                    amount: "$amount"
                }
            },
        ]).toArray();
        return docs;
    }

    async RevenueByUser(input: ReportNS.Revenue.InputByUser) {
        const [min, max] = input.time;
        const $match = { ctime: { $gte: min, $lte: max } };
        const $group = {
            _id: {
                time: GroupByTime("$ctime", input.interval),
                user_id: '$create_by',
            },
            amount: { $sum: '$amount' }
        };
        const docs = await this.col_accounting_transaction.aggregate([
            { $match },
            { $group },
            {
                $project: {
                    _id: 0,
                    time: "$_id.time",
                    user_id: "$_id.user_id",
                    amount: "$amount",
                }
            },
        ]).toArray();
        return docs;
    }

    private QueryMongoAggerate(input : ReportNS.Service.Input) {
        const $match = {$and : [{"ref" : "order"},{ ctime : {$gte: input.time[0], $lte: input.time[1]}}]}
        const $lookup_order = {
            from : "order",
            localField : "ref_id",
            foreignField : "_id",
            as : "order"
        }
        const $lookup_jobstep = {
            from : "job_step",
            localField : "order.ref_id",
            foreignField : "_id",
            as : "step"
        }
        return [
            { $match },
            { $lookup : $lookup_order },
            { $unwind : "$order" },
            { $lookup : $lookup_jobstep },
            { $unwind : "$step" }
        ]
    }

    async Service(input: ReportNS.Service.Input) {
        console.log(input);
        let docs = [] as any;
        const lookup_data = this.QueryMongoAggerate(input);
        let $project = {
            amount : 1,
            service_id : 1,
            customer : "$step.order.customer",
            time : {$dateToString: { format: "%Y-%m-%d- %H:%M", date: {$toDate: "$ctime"}, timezone : "+07:00"}},
            ctime : 1
        } as any;

        let $project_by_date = {
            _id: "$_id.time",
            service_id : "$_id.service_id",
            customer : 1,
        } as any;

        const $$lookup_services = {
            from : "service",
            localField : "service_id",
            foreignField : "_id",
            as : "service"
        }

        if (input.interval === ReportNS.Interval.Month) {
            $project = {
                amount : 1,
                service_id : 1,
                time : {$dateToString: { format: "%Y-%m", date: {$toDate: "$ctime"}}},
                ctime : 1
            }
            const $group = {
                _id : {
                    time : "$time",
                    service_id : "$service_id",
                },
                count : {$sum : 1},
                total : {$sum : "$amount"}
            }
            $project_by_date = {
                _id: "$_id.time",
                service_id : "$_id.service_id",
                count : 1,
                total : 1
            }
            docs = await this.col_accounting_transaction.aggregate([
                ...lookup_data,
                { $unwind : "$step.order.items" },
                { $addFields : { service_id : "$step.order.items.ref_id" }},
                { $match : { "service_id" : input.service_id }},
                { $project },
                { $group },
                { $project : $project_by_date },
                { $lookup : $$lookup_services },
                { $unwind : "$service" },
                { $sort : {_id : -1 }}
            ]).toArray();
        } else {
            docs = await this.col_accounting_transaction.aggregate([
                ...lookup_data,
                { $unwind : "$step.order.items" },
                { $addFields : { service_id : "$step.order.items.ref_id" }},
                { $match : { "service_id" : input.service_id }},
                { $project },
                { $lookup : $$lookup_services },
                { $unwind : "$service" },
                { $sort : {ctime : 1 }}
            ]).toArray();
        }
        return docs.map(d => {
            const { _id : t, ...res } = d;
            return { time : t , ...res };
        });
    }

    async ServiceType(input: ReportNS.Service.Input) {
        console.log(input);
        const lookup_data = this.QueryMongoAggerate(input);
        const job_step_status = Object.values(JobNS.StepStatus).filter(s => ![JobNS.StepStatus.New, JobNS.StepStatus.Cancel].includes(s));
        const job_step_type = Object.values(JobNS.StepType).filter(t => t !== JobNS.StepType.Buy);
        const $project = {
            amount : 1,
            job_step_type : {$in : ["$step.type", job_step_type]},
            job_step_status : {$in : ["$step.status", job_step_status]},
            service_type : { $first : "$step.order.items.ref_value.type" },
            time : {$dateToString: { format: "%Y-%m", date: {$toDate: "$ctime"}}}
        }
        //remove record with status cancel or new, type buy
        const $match = {$and : [{job_step_status : true}, {job_step_type : true}]}
        const $group = {
            _id : {
                time : "$time",
                service_type : "$service_type",
            },
            count : {$sum : 1},
            total : {$sum : "$amount"}
        }
        const $project_by_date = {
            _id: "$_id.time",
            type : "$_id.service_type",
            count : 1,
            total : 1
        }
        const docs = await this.col_accounting_transaction.aggregate([
            ...lookup_data,
            { $project },
            { $match },
            { $group },
            { $project : $project_by_date },
            { $sort : {_id : -1 }}
        ]).toArray();
        return docs.map(d => {
            const { _id : t, ...res } = d;
            return { time : t , ...res };
        }).filter(el => el.type !== null);
    }
}