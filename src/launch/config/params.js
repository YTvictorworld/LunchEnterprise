const path = require("path");
module.exports = {
  version: {
    number: "1.16.5",
    type: "release",
  },
  memory: {
    max: "6G",
    min: "4G",
  },
  loc: path.join(process.cwd(), "../../AppData/Roaming/.minecraft"),
};
