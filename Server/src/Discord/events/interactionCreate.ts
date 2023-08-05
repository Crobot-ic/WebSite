import { Guild, Interaction } from "discord.js";
import channelsInformations from "../../../ChannelsConfig.json";

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

        if(interaction.isAutocomplete()) {
            if(interaction.commandName === "update_project") {
                interaction.respond([
                    { name: "Nom du projet", value: "projectName" }, 
                    { name: "Avancement du projet", value: "projectAdvancement" }, 
                    { name: "Description du projet", value: "projectDescription" }, 
                    { name: "Image du projet", value: "projectImage" },
                    { name: "Deadline du projet", value: "projectDeadline" }, 
                    { name: "GitHub", value: "projectGh" }
                ])
            } else {
                interaction.respond([
                    { name: "Durée de l'événement", value: "duration" }, 
                    { name: "Date de l'événeemnt", value: "eventDate" }, 
                    { name: "Nom de l'événement", value: "eventName" }, 
                    { name: "Description", value: "description" }
                ])
            }
        }

        const devGuild: Guild = await client.guilds.cache.get(channelsInformations[runMode].SERV_ID);
        devGuild.commands.set(client.commands.map((cmd: any) => cmd))
    }
}