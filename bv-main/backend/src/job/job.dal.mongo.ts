import { JobNS } from "./job";
import { MongoDB, FromMongoData, ToMongoData, MongoErrorCodes, MongoCommon } from "../lib/mongodb";
import { ContextNS } from "../ext/ctx";
import { endOfDay, previousDay, startOfDay, subMonths } from "date-fns";
import { ONE_DAY } from "../common/const";
export class JobDALMongo implements JobNS.DAL {
  constructor(
    private db: MongoDB
  ) { }

  async init() {
    this.col_job_step.createIndex({ job_id: 1 , code : 1}, { unique: true , background : true});
    this.col_job.createIndex({ ref_id : 1 }, { background : true })
  }

  private col_job = this.db.collection("job");
  private col_job_step = this.db.collection("job_step");

  async CreateJob(ctx: ContextNS.Context, job: JobNS.Job) {
    const doc = ToMongoData.One(job);
    const session = MongoCommon.Session(ctx);
    await this.col_job.insertOne(doc, { session });
  }

  async GetJob(ctx: ContextNS.Context, id: string) {
    const session = MongoCommon.Session(ctx);
    const doc = await this.col_job.findOne({ _id: id }, { session });
    return FromMongoData.One<JobNS.Job>(doc);
  }

  async UpdateJob(ctx: ContextNS.Context, job: JobNS.Job) {
    const session = MongoCommon.Session(ctx);
    const { modifiedCount } = await this.col_job.updateOne(
      { _id: job.id }, {
      $set: {
        modified_by : job.modified_by,
        state: job.state,
        mtime: job.mtime,
      }
    }, { session });
    return modifiedCount;
  }

  async GetStep(ctx: ContextNS.Context, id: string) {
    const session = MongoCommon.Session(ctx);
    const doc = await this.col_job_step.findOne({ _id: id }, { session });
  return FromMongoData.One<JobNS.Step>(doc);
  }

  async GetStepByCode(ctx: ContextNS.Context, code: string) {
    const session = MongoCommon.Session(ctx);
    const doc = await this.col_job_step.findOne({ code }, { session });
    return FromMongoData.One<JobNS.Step>(doc);
  }

  async CreateStep(ctx: ContextNS.Context, step: JobNS.Step) {
    const doc = ToMongoData.One(step);
    const session = MongoCommon.Session(ctx);
    await this.col_job_step.insertOne(doc, { session });
  }

  async UpdateStep(ctx: ContextNS.Context, job_step: JobNS.Step) {
    const session = MongoCommon.Session(ctx);
    const doc = await ToMongoData.One(job_step);
    await this.col_job_step.updateOne({ _id: doc._id }, {
      $set: doc
    }, { session });
  }

  async ListStep(ctx: ContextNS.Context, query: JobNS.QueryStepParams) {
    const session = MongoCommon.Session(ctx);
    const start_time = startOfDay(Date.now()).getTime();
    const end_time = endOfDay(Date.now()).getTime();
    let $match = {} as any;
    let docs : Array<any>;
    // process view job bll
    if (query.job_id) {
      $match.job_id = query.job_id;
    }
    if (query.location_id) {
      if (Array.isArray(query.status)) {
        $match = {$and : [{ctime : {$gte : start_time , $lte : end_time}}, {status : {$in : query.status}}, {location_id : query.location_id}]};
      } else {
        $match = {ctime : {$gte : start_time , $lte : end_time}};
      }
      docs = await this.col_job_step.aggregate([
        {$match}
      ]).toArray();
    } else if (query.customer_code) {
      if (Array.isArray(query.type)) {
        $match = {$and : [{ctime : {$gte : start_time , $lte : end_time}}, {type : {$in : query.type}}]};
      } else {
        $match = {ctime : {$gte : start_time , $lte : end_time}};
      }
      docs = await this.col_job_step.aggregate([
        {$match}
      ]).toArray();
    } else {
      docs = await this.col_job_step.find($match, { session }).toArray();
    }
    return FromMongoData.Many<JobNS.Step>(docs); 
  }

  async SearchJobStep(ctx: ContextNS.Context, query: JobNS.QueryStepParams) {
    const session = MongoCommon.Session(ctx);
    const end_time = endOfDay(Date.now()).getTime() - ONE_DAY - 1;
    const weekend_time = end_time - 3 * ONE_DAY - 1;
    let docs = [] as any;
    if (query.customer_code) {
      const filter = { $and : [
        {ctime : {$gte : weekend_time , $lte : end_time}}, 
        {job_ref_id : query.customer_code},
        {location_id : query.location_id}
      ]};
      docs = await this.col_job_step.find(filter, { session }).toArray();
      return FromMongoData.Many<JobNS.Step>(docs); 
    }
    if (query.full_name) {
      const $match = {$and : [
        {ctime : {$gte : weekend_time , $lte : end_time}}, 
        {"order.customer.text" : query.full_name},
        {location_id : query.location_id}
      ]};
      docs = await this.col_job_step.aggregate([
        {$match}
      ], { session }).toArray();
      return FromMongoData.Many<JobNS.Step>(docs); 
    }
    return FromMongoData.Many<JobNS.Step>(docs);
  }

  async ListJob(ctx: ContextNS.Context, query: JobNS.QueryJobParams) {
    const session = MongoCommon.Session(ctx);
    const filter = {} as any;
    if (query.ref_id) {
      filter.ref_id = { $in : query.ref_id };
    }
    if (query.date) {
      filter.date = query.date;
    }
    const preThreeMonth = subMonths(Date.now(), 3).getTime();
    filter["ctime"] = {$gte : preThreeMonth, $lte : Date.now()};
    const docs = await this.col_job.find(filter, { session }).sort({ctime : -1}).toArray();
    return FromMongoData.Many<JobNS.Job>(docs);
  }

  async CountJob(ctx: ContextNS.Context, query: JobNS.QueryJobParams) {
    const session = MongoCommon.Session(ctx);
    const filter = {} as any;
    if (Array.isArray(query.ref_id)) {
      filter.ref_id = { $in: query.ref_id };
    }
    if (query.date) {
      filter.date = query.date;
    }
    const count = await this.col_job.countDocuments(filter, { session });
    return count;
  }
}
