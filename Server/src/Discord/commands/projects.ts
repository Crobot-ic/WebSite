import { Client, CommandInteraction } from "discord.js";
import listProjects from "./Projects/ListProjects";
import Edit from "./Projects/Edit";
import deleteProject from "./Projects/DeleteProject";
import commandsOptions from "./Projects/ProjectOptionsCommand.json";
import SeeProject from "./Projects/SeeProject";
import createProject from "./Projects/CreateProjects";

module.exports = {
    name: "project",
    description: "Allow you to play with projects !",
    options: commandsOptions,
    runSlash: (client: Client, interaction: CommandInteraction) => {
        const listCommands = {
            list: () => listProjects(client, interaction), 
            create: () => createProject(client, interaction),
            delete: () => deleteProject(client, interaction),
            see: () => SeeProject(client, interaction),
            edit: () => Edit(client, interaction),
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