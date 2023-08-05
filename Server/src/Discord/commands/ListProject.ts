import { Client } from "discord.js";
import Project from "../../Models/Project";

module.exports = {
    name: "list_project", 
    description: "Liste les projets de l'association", 
    runSlash: async (client: Client, interaction: any) => {
        const resDb = await Project.findAll({ attributes: ["projectName", "projectId"] });
        let message = "";

        for(let i = 0; i < resDb.length; i++) {
            message += 
                "**Nom du projet :** " + resDb[i].dataValues.projectName + "  -  " +
                "**ID du projet :** " + resDb[i].dataValues.projectId + "\n";
        }

        if(message == "") message = "À l'heure actuelle, l'association n'a aucun projet !";

        interaction.reply({ content: message, ephemeral: true });
    }
}