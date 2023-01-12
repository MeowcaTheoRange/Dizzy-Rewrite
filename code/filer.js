var { DAUTokenizer } = require("./parser.js");
var { DAUConverters } = require("./converter.js");
const path = require("path");
const fs = require("fs");

function TokenizeFiles(name, output) {
  if (!fs.existsSync(path.join("format"))) fs.mkdirSync(path.join("format"));
  if (!fs.existsSync(path.join("format", "converted"))) fs.mkdirSync(path.join("format", "converted"));
  if (!fs.existsSync(path.join("format", "source"))) fs.mkdirSync(path.join("format", "source"));
  if (!fs.existsSync(path.join("format", "source", "json"))) fs.mkdirSync(path.join("format", "source", "json"));
	var file = fs.readFileSync(path.join("format", "source", name + ".dau"), {encoding: "utf-8"});
	var jsop = DAUTokenizer(file);
	fs.writeFileSync(path.join("format", "source", "json", name + ".json"), JSON.stringify(jsop, null, 2));
	var convop = DAUConverters[output](jsop);
  var folder = path.join("format", "converted", convop.folder);
  var namefolder = path.join("format", "converted", convop.folder, name);
  if (!fs.existsSync(folder)) fs.mkdirSync(folder);
  if (!fs.existsSync(namefolder) && convop.data.length > 1) fs.mkdirSync(namefolder);
  var allFileData = convop.data.map(x=>x.data);
  fs.writeFileSync(path.join(folder, name + convop.extension), allFileData.join(""));
  if (convop.data.length > 1) convop.data.forEach((data) => {
    fs.writeFileSync(path.join(namefolder, data.name.replace(/[/\\?%*:|"<> ]/g, '_') + convop.extension), data.data);
  })
}

TokenizeFiles(process.argv[2], process.argv[3]);