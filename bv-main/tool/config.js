const fs = require("fs");
const path = require("path");

module.exports = function ReadConfig() {
    require("dotenv").config();
    const opSystem = process.platform;
    const now = new Date().toLocaleDateString("en-gb").split("/").reverse().join("");
    if (!fs.existsSync(path.join(__dirname, "backup"))) {
        fs.mkdirSync(path.join(__dirname, "backup"), {recursive : true});
    } 
    const config = {
        database : {
            name : process.env.DB_NAME,
            port : +process.env.PORT
        },
        path : path.join(__dirname, "backup", `${now}-${process.env.DB_NAME}.gzip`),
        root : ["win64", "win32"].includes(opSystem) ? 
            path.parse(process.cwd()).root + "Program Files\\MongoDB\\Tools\\100\\bin" :
            opSystem === "darwin" ?
            "" : ""
    }
    return config;
}