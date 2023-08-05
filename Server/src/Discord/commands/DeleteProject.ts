import { Client, TextChannel, MessageAttachment } from "discord.js";
import Project from "../../Models/Project";
import { rmSync } from "fs";
import replaceAll from "../../Utils/String/replaceAll";
import projectEmbed from "../../Utils/Embeds/ProjectEmbed";

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

        const projectInfo = (await Project.findOne({ // Récupère le projet
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

        // Génération de l'Embed
        let imageAttachmentLocalization = "attachment://" + replaceAll((projectInfo.projectName as string).normalize("NFD"), /[\u0300-\u036f]/g, "") 
        imageAttachmentLocalization = replaceAll(imageAttachmentLocalization, " ", "_") + ".png";
        const embedInfo = {
            projectAdvancement: projectInfo.projectAdvancement,
            imageLocalization: imageAttachmentLocalization,
            projectTitle: projectInfo.projectName,
            deadline: projectInfo.deadline, 
            description: projectInfo.projectDescription
        };
        const image = new MessageAttachment(projectInfo.imageLocalization);
        const embeds = [projectEmbed(embedInfo)]; 

        // Suppression du message du projet
        const message = await (await client.channels.fetch(process.env.PROJECT_CHANNEL as string) as TextChannel).messages.fetch(messageProject as string);
        await message.delete();

        // Supprimer le projet - Base de données
        await Project.destroy({ where: { projectName } })

        // Envoie de l'Embed
        const logChannel = await client.channels.fetch(process.env.LOG_BOT_CHANNEL as string) as TextChannel;
        await logChannel.send({
            content: interaction.user.username + " a supprimé le projet " + projectName,
            embeds, 
            files: [image]
        })

        // Supprimer le projet - Image
        rmSync(process.cwd() + "/uploads/project/" + projectName + ".png"); 

        interaction.reply({
            content: "Le projet " + projectName + " a  bien été supprimé !", 
            ephemeral: true
        });
    }
}