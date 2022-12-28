const { diagnose, Version } = require("@xmcl/core");

const params = require("../config/params.js");
async function check() {
  let resolvedVersion;
  let minecraftLocation = params.loc;
  let minecraftVersionId = params.version.number;

  try {
    resolvedVersion = await Version.parse(
      minecraftLocation,
      minecraftVersionId
    );
  } catch (err) {
    switch (err.error) {
      case "MissingVersionJson": // do things...
        console.log("[] Your minecraft version json is missing or corrupted");
        break;
      default:
        const report = await diagnose(
          resolvedVersion.id,
          resolvedVersion.minecraftDirectory
        );

        const issues = report.issues;
        for (let issue of issues) {
          switch (issue.role) {
            case "minecraftJar":
              console.log("[] Minecraft jar is missing or corrupted");
              break;
            case "versionJson": // your json has problem
              console.log("[] Version json is missing or corrupted");
              break;
            case "library": // your lib might be missing or corrupted
              console.log("[] Library is missing or corrupted");
              break;
            case "assets": // some assets are missing or corrupted
              console.log("[] Assets are missing or corrupted");
              break;
            default:
              console.log("[] Unknown issue");
              break;
            // and so on
          }
        }
    }
  }
}
module.exports = check;
