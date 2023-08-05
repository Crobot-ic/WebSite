import channelsInformations from "../../../ChannelsConfig.json";

module.exports = {
    name: "ready", 
    once: true, 
    async execute (client: any) {
        if(process.env.MODE != "prod" && process.env.MODE != "dev") {
            console.error("Wooops, something went wrong on launching the BOT ! Error : Value invalid for MODE env var !");
            return;
        }
        const runMode = process.env.MODE;

        const devGuild = client.guilds.cache.get(channelsInformations[runMode].SERV_ID);
        devGuild?.commands.set(client.commands.map((cmd: any) => cmd));

        console.log("Bot launched !");
    }
}