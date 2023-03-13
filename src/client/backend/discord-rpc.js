const DiscordRPC = require("discord-rpc");
module.exports = async function Presence(details, state) {
    const clientID = "1084566028102684743";
    const client = new DiscordRPC.Client({ transport: "ipc" });
    client.on("ready", () => {
        client.request("SET_ACTIVITY", {
            pid: process.pid,
            activity: {
                details: details, //details,
                assets: {
                    large_image: "bagiconrich",
                    large_text: "Developing",
                },  
                timestamps: {
                    start: Date.now(),
                },
                instance: false,
            },
        });
    });
    client.login({ clientId: clientID }).catch(console.error);
}