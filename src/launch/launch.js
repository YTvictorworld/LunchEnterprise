const { Client, Authenticator } = require("minecraft-launcher-core");
const fs = require("fs");
const req = require("./assets/check.js");

//variables
const opts = require("./config/conf.js");
var launcher = new Client();

let OptsClass = new opts(
  null,
  this.version,
  this.root,
  this.memory,
  this.window,
  this.authorization
);

launcher.launch(OptsClass);

launcher.on("debug", (e) => console.log(e));
launcher.on("data", (e) => console.log(e));
launcher.on("close", (e) => console.log(e));
launcher.on("progress", (e) => console.log(e));
launcher.on("download-status", (e) => console.log(e));
