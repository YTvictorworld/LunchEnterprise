const path = require("path");
exports = {
  version: {
    number: "1.12.2",
    type: "release",
  },
  memory: {
    max: "6G",
    min: "4G",
  },
  loc: path.join(process.cwd(), "../../../AppData/Roaming/.minecraft"),
};

//Se removio el username del auth del mismo modulo (minecraft-launcher-core)
