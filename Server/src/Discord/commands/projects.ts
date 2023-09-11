import { Client, CommandInteraction } from "discord.js";
import listProjects from "./Projects/ListProjects";
import commandsOptions from "./Projects/ProjectOptionsCommand.json";

module.exports = {
    name: "project",
    description: "Allow you to play with projects !",
    options: commandsOptions,
    runSlash: (client: Client, interaction: CommandInteraction) => {
        const listCommands = {
            list: () => listProjects(client, interaction), 
            create: () => listProjects(client, interaction),
            delete: () => listProjects(client, interaction),
            see: () => listProjects(client, interaction),
            edit: () => listProjects(client, interaction),
        };
        
        // Get sub commands
        const subCommands = interaction.options.getSubcommand();

        // Narrowing
        if (!(subCommands == "list" || subCommands == "create" || subCommands == "delete" || subCommands == "see" || subCommands == "edit")) {
            return interaction.reply({
                ephemeral: true, 
                content: "La commande n'a pas pu être trouvé !"
            })
        }

        listCommands[subCommands]();
    }
}