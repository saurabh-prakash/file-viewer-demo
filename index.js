const AdmZip = require("adm-zip");
const os = require("os");
const path = require("path");
const open = require("open");

const jobID = "adsadds";
const taskID = "";
const selectedFile = "/Final-Report/1/target/site/index.html";

class Node {
    constructor(name, parent) {
        this.name = name;
        this.parent = parent
        if (parent !== null) {
            this.fullName = path.join(parent.fullName, name);
        }
        this.children = {};
    }
    
    addChild(name) {
        if (this.children[name] !== undefined) {
            return;
        }
        this.children[name] = (new Node(name, this));
    }

    addFile(zipEntry) {
        this.isFolder = zipEntry.isDirectory;
        const entryName = zipEntry.entryName;
        var curr = this;
        const parts = entryName.split(path.sep);
        for (let i = 0; i < parts.length; i += 1) {
            if (parts[i] !== "") {
                curr.addChild(parts[i]);
                curr = curr.children[parts[i]];
            }
        }
    }
}

// reading archives
const zip = new AdmZip("./Final-Report.zip");
const zipEntries = zip.getEntries();

const rootNode = new Node("", null);
rootNode.isFolder = true;
rootNode.fullName = "";
zipEntries.forEach(function (zipEntry) {
    rootNode.addFile(zipEntry);
});

const artefactBaseDir = path.join(os.tmpdir(), jobID, taskID);
zip.extractAllTo(artefactBaseDir, true);

// check if you can use browser default function for opening local file in a new tab instead of `open`
open(artefactBaseDir + selectedFile);

