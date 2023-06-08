import { Client, MessageAttachment } from "discord.js";
import Project from "../Models/Project";
import projectEmbed from "../Utils/Embeds/ProjectEmbed";
import replaceAll from "../Utils/String/replaceAll";

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
        
        const projectInfo = (await Project.findOne({ 
            where: { projectId }, 
            attributes: ["projectAdvancement", "imageLocalization", "projectName", "deadline", "projectDescription"]
        }))?.dataValues;

        if(!projectInfo) { // Check l'existence du projet
            return interaction.reply({
                content: "Le projet demandé n'existe pas !", 
                ephemeral: true
            })
        }

        let imageLocalization = "attachment://" + replaceAll((projectInfo.projectName as string).normalize("NFD"), /[\u0300-\u036f]/g, "") 
        imageLocalization = replaceAll(imageLocalization, " ", "_") + ".png";
        
        // Create the embed
        const embedInfo = {
            projectAdvancement: projectInfo.projectAdvancement,
            imageLocalization,
            projectTitle: projectInfo.projectName,
            deadline: projectInfo.deadline, 
            description: projectInfo.projectDescription
        };
        const image = new MessageAttachment(projectInfo.imageLocalization);
        const embeds = [projectEmbed(embedInfo)]; 

        interaction.reply({
            content: "Voici le projet demandé :", 
            embeds, 
            files: [image],
            ephemeral: true
        })
    }
}