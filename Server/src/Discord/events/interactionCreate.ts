import { Guild, Interaction } from "discord.js";
import channelsInformations from "../../../ChannelsConfig.json";
import sendAutocompleteInteraction from "../../Utils/Discord/SendAutocomplete";

module.exports = {
    name: "interactionCreate", 
    once: false, 
    async execute(client: any, interaction: Interaction) {
        if(process.env.MODE != "prod" && process.env.MODE != "dev") {
            console.error("Wooops, something went wrong on launching the BOT ! Error : Value invalid for MODE env var !");
            return;
        }
        const runMode = process.env.MODE;

        if(interaction.isCommand()) {
            const cmd = client.commands.get(interaction.commandName);
            if(!cmd) return interaction.reply("Cette commande n'existe pas");
            cmd.runSlash(client, interaction);
        }

        if(interaction.isAutocomplete()) sendAutocompleteInteraction(interaction);

        const devGuild: Guild = await client.guilds.cache.get(channelsInformations[runMode].SERV_ID);
        devGuild.commands.set(client.commands.map((cmd: any) => cmd))
    }
}