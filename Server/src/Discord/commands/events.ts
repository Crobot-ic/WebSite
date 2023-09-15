import { Client, CommandInteraction } from "discord.js";
import commandsOptions from "./events/EventCommandsOptions.json";
import allProjects from "./events/All";
import createEvents from "./events/Create";
import deleteEvents from "./events/Delete";
import IncomingEvents from "./events/Incoming";
import editEvents from "./events/Edit";
import seeEvents from "./events/See";

module.exports = {
    name: "event", 
    description: "Allow you to play with projects !",  
    options: commandsOptions, 
    runSlash: (client: Client, interaction: CommandInteraction) => {
        const listCommands = {
            all: () => allProjects(client, interaction),
            create: () => createEvents(client, interaction),
            delete: () => deleteEvents(client, interaction),
            incoming: () => IncomingEvents(client, interaction),
            edit: () => editEvents(client, interaction),
            see: () => seeEvents(client, interaction),
        }

        // Get sub commands
        const subCommands = interaction.options.getSubcommand();

        // Narrowing
        if (!(subCommands == "all" || subCommands == "create" || subCommands == "delete" || subCommands == "see" || subCommands == "edit" || subCommands == "incoming")) {
            return interaction.reply({
                ephemeral: true, 
                content: "La commande n'a pas pu être trouvé !"
            })
        }

        listCommands[subCommands]();
    }
};