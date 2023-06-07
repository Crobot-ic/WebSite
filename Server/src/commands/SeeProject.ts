import { Client } from "discord.js";
import Project from "../Models/Project";
import projectEmbed from "../Utils/Embeds/ProjectEmbed";

module.exports = {
    name: "see_project", 
    description: "Voir un projet en détail", 
    options: [
        {
            name: "project_id", 
            description: "Identifiant du projet à voir", 
            type: "STRING",
            required: true
        }
    ], 
    runSlash: async (client: Client, interaction: any) => {
        const projectId = parseInt(interaction.options.getString("project_id"));
        console.log(projectId);
        
        const projectInfo = (await Project.findOne({ 
            where: { projectId }, 
            attributes: ["projectAdvancement", "imageDiscordLocalization", "projectName", "deadline", "projectDescription"]
        }))?.dataValues;

        if(!projectInfo) { // Check l'existence du projet
            return interaction.reply({
                content: "Le projet demandé n'existe pas !", 
                ephemeral: true
            })
        }
        
        // Create the embed
        const embedInfo = {
            projectAdvancement: projectInfo.projectAdvancement,
            imageLocalization: projectInfo.imageDiscordLocalization,
            projectTitle: projectInfo.projectName,
            deadline: projectInfo.deadline, 
            description: projectInfo.projectDescription
        }
        const embeds = [projectEmbed(embedInfo)]; 

        interaction.reply({
            content: "Voici le projet demandé :", 
            embeds, 
            ephemeral: true
        })
    }
}