import { Client } from "discord.js";
import uniqueProjectName from "../Utils/Validators/UniqueProjectName";
import checkExistenceProjectId from "../Utils/Validators/CheckExistenceProjectId";
import Project from "../Models/Project";
import { rmSync } from "fs";

module.exports = {
    name: "delete_project", 
    description: "Supprime un projet", 
    options: [
        {
            name: "id_projet", 
            description: "Identifiant du projet à supprimer", 
            required: true, 
            type: "STRING"
        }
    ], 
    runSlash: async (client: Client, interaction: any) => {
        const projectId = parseInt(interaction.options.getString("id_projet"));
        
        if(interaction.channelId != process.env.BOT_CHANNEL) { // Check le salon
            return interaction.reply({
                content: "Vous ne pouvez pas utiliser cette commande dans ce salon !",
                ephemeral: true 
            })
        }

        if(!await checkExistenceProjectId(projectId)) { // Check l'existence du projet
            return interaction.reply({
                content: "Le projet demandé n'existe pas !", 
                ephemeral: true
            })
        }

        const projectName = (await Project.findOne({ // Récupère le nom du projet
            where: { projectId }, 
            attributes: ["projectName"]
        }))?.dataValues.projectName;


        await Project.destroy({ // Supprimer le projet - Base de données
            where: { projectName }
        })

        rmSync(process.cwd() + "/uploads/project/" + projectName + ".png"); // Supprimer le projet - Image

        interaction.reply("Le projet " + projectName + " a  bien été supprimé !");
    }
}