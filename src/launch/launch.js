const fs = require("fs");
const req = require("./assets/check.js");

//variables
const opts = require("./config/conf.js");
let OptsClass = new opts(
  null,
  this.version,
  this.root,
  this.memory,
  this.window
);

const { Client } = require("minecraft-launcher-core");
var launcher = new Client();

launcher.on("debug", (e) => console.log(e));
launcher.on("data", (e) => console.log(e));
launcher.on("close", (e) => console.log(e));
launcher.on("progress", (e) => console.log(e));
launcher.on("download-status", (e) => console.log(e));
