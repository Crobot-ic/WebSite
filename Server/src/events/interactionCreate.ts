import { Guild, Interaction } from "discord.js";

module.exports = {
    name: "interactionCreate", 
    once: false, 
    async execute(client: any, interaction: Interaction) {
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

        const devGuild: Guild = await client.guilds.cache.get(process.env.SERV_ID);
        devGuild.commands.set(client.commands.map((cmd: any) => cmd))
    }
}