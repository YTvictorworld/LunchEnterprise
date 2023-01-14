const params = require("./params.js");
var loc = params.loc;
var vs = params.version;

// recommend to have the class name like "Opt", first letter upper case for better readability
// Ok
class opts {
  /**
   * @arg {object} Window - The window options to launch.
   * @arg {number} [Window.height] - The height of the Minecraft window.
   * @arg {number} [Window.width] - The width of the Minecraft window.
   * @arg {object} memory - The memory options to launch.
   * @arg {string} [memory.max] - The maximum amount of memory to allocate to the Minecraft process.
   * @arg {string} [memory.min] - The minimum amount of memory to allocate to the Minecraft process.
   * @arg {object} version - The version options to launch.
   * @arg {string} [version.number] - The version number of the Minecraft version to launch.
   * @arg {string} [version.type] - The type of the Minecraft version to launch. Can be "release", "snapshot" or "old_alpha".
   * @arg {boolean} ClientPackage - null
   * @arg {string} root - The path of the root directory of the Minecraft installation.
   */
  constructor(ClientPackage, version, memory, root, Window, authorization) {
    this.ClientPackage = ClientPackage;
    this.version = version || vs;
    this.memory = memory || { max: "6G", min: "4G" };
    this.root = root || loc;
    this.Window = Window || { height: 1024, width: 720 };
    this.authorization = authorization;
  }
}
(module.exports = opts), vs;
