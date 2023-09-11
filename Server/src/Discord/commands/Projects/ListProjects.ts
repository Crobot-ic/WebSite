import { CommandInteraction, Client } from "discord.js";
import Project from "../../../Models/Project";
import checkBotChannel from "../../../Utils/Discord/CheckBotChannel";

const listProjects = async (client: Client, interaction: CommandInteraction) => {
    // Check si la commande a été fait dans le bon channel
    if(process.env.MODE != "prod" && process.env.MODE != "dev") { // Check env MODE variable
        return interaction.reply({ content: "Wooops, something went wrong !", ephemeral: true }); 
    }    
    const runMode = process.env.MODE;
    
    if(!checkBotChannel(interaction, runMode)) return; // Check if the command has been made in the good channel    

    const allProjects = await Project.findAll({ attributes: ["projectName", "projectId"] });
    let message = "";

    for(let i = 0; i < allProjects.length; i++) {
        message += 
            "**Nom du projet :** " + allProjects[i].dataValues.projectName + "  -  " +
            "**ID du projet :** " + allProjects[i].dataValues.projectId + "\n";
    }

    if(message == "") {
        message = "À l'heure actuelle, l'association n'a aucun projet !";
    }

    return interaction.reply({ content: message, ephemeral: true });
}

export default listProjects;