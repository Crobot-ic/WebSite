import { Client, CommandInteraction } from "discord.js";
import commandsOptions from "./events/EventCommandsOptions.json";

module.exports = {
    name: "event", 
    description: "Allow you to play with projects !",  
    options: commandsOptions, 
    runSlash: (client: Client, interaction: CommandInteraction) => {

    }
};