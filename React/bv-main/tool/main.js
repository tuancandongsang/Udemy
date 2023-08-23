const { spawn } = require("child_process");
const ReadConfig = require("./config.js");
const config = ReadConfig();
const cron = require("node-cron");

//backup every night 23h10
cron.schedule("10 23 * * *", () => BackupMongoDB());
//BackupMongoDB()

function BackupMongoDB() {
    // command backup interface : mongodump --port=27018 --db=bv_demo --archive=./20220112.gzip --gzip
    // command backup : mongodump --db=db_name --archive=./file_name.gzip --gzip
    // command restore: mongorestore --host=localhost --port=27017 --gzip --archive=dump.tar.gz
    const child = spawn("mongodump", [
        `--port=${config.database.port}`,
        `--db=${config.database.name}`,
        `--archive=${config.path}`,
        `--gzip`
    ], {
        env : {
            PATH: config.root
        }
    })
    child.stdout.on("data", (data) => {
        console.log("stdout:\n", data);
    })
    child.stderr.on("data", (data) => {
        console.log("stderr:\n", `${Buffer.from(data)}`);
    })
    child.on("error", (err) => {
        console.log("error:\n", err);
    })
    child.on("exit", (code, signal) => {
        if (code) console.log("Process exit with code : " + code);
        else if (signal) console.log("Process killed with signal " + signal);
        else console.log("Backup is successfull");
    })
}

/******************************************************************/
const log = console.log;
console.log = function (...args) {
    args.unshift(new Date());
    log.apply(console ,args);       
}
console.log({
    dir : config.path,
    root : config.root,
    status : "backup already !"
})
