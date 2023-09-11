import { CommandInteraction, Client } from "discord.js";
import Project from "../../../Models/Project";

const listProjects = async (client: Client, interaction: CommandInteraction) => {
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