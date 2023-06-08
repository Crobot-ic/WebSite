import { Client, TextChannel } from "discord.js";
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

        const projectInfo = (await Project.findOne({ // Récupère le nom du projet
            where: { projectId }, 
            attributes: ["projectAdvancement", "imageLocalization", "projectName", "deadline", "projectDescription", "messageProject"]
        }))?.dataValues;
        const { projectName, projectAdvancement, imageLocalization, deadline, projectDescription, messageProject } = projectInfo;

        if(projectInfo == null) {
            return interaction.reply({
                content: "Le projet demandé n'existe pas !",
                ephemeral: true
            })
        }

        const message = await (await client.channels.fetch(process.env.PROJECT_CHANNEL as string) as TextChannel).messages.fetch(messageProject as string)
        console.log(message);
        await message.delete();

        await Project.destroy({ // Supprimer le projet - Base de données
            where: { projectName }
        })

        rmSync(process.cwd() + "/uploads/project/" + projectName + ".png"); // Supprimer le projet - Image

        interaction.reply("Le projet " + projectName + " a  bien été supprimé !");
    }
}