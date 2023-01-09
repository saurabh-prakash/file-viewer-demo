const AdmZip = require("adm-zip");
const os = require("os");
const path = require("path");
const open = require("open");

// reading archives
const zip = new AdmZip("/Users/saurabh/Downloads/Final-Report.zip");

const jobID = "adsadds";
const taskID = "";
const selectedFile = "/Final-Report/1/target/site/index.html";

const artefactBaseDir = path.join(os.tmpdir(), jobID, taskID);
zip.extractAllTo(artefactBaseDir, true);
open(artefactBaseDir + selectedFile);

