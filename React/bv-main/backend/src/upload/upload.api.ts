import * as express from "express";
import * as fs from "fs";
import { UploadNS } from "./upload";
import { upload } from "./upload.api.middleware";

export function NewAPIUpload(
    uploadBLL : UploadNS.BLL
) {
    const router = express.Router();
    router.get("/list" , async (req,res) => {
        const ref_id = req.query.ref_id as string;
        const docs = await uploadBLL.ListData(ref_id);
        res.json(docs);
    })

    router.get("/get", async (req,res) => {
        const name = req.query.name as string;
        const doc = await uploadBLL.GetData(name);
        res.json(doc);
    })

    router.use(upload.array("img",20)); //upload multi 20 photo
    router.post("/photo/upload", async (req,res,next) => {
        const files = req.files;
        const body = req.body;
        let docs = [];
        if (files.length === 0) {
            // const error = new Error('Please upload a file')
            // return next(error);
        } else {
            for (let i in files) {
                let file = files[i];
                let metadata = body["img"];
                if (typeof(metadata ) == "string") {
                    const params : UploadNS.CreateDataParams = {
                        ref_id : req.body.ref_id,
                        url : file.path,
                        metadata : metadata,
                        name : file.filename,
                        size : file.size
                    }
                    const doc = await uploadBLL.SaveData(params);
                    return res.json(doc);
                }
                if (metadata.length) {
                    const params : UploadNS.CreateDataParams = {
                        ref_id : req.body.ref_id,
                        url : file.path,
                        metadata : metadata[i],
                        name : file.filename,
                        size : file.size
                    }
                    const doc = await uploadBLL.SaveData(params);
                    docs.push(doc);
                }
            }
        }
        res.json(docs);
    }) 

    router.get("/photo/download/:filename", async (req,res,next) => {
        const name = req.params.filename;
        const url = await uploadBLL.Download(name);
        fs.readFile(url, (err,data) => {
            if (err) {
                return res.json(UploadNS.Errors.ErrDataNotFound)
            }
            res.setHeader("Content-Disposition" , "attachment : filename=" + name +"");
            res.send(data);
        })
    })
    return router;
}