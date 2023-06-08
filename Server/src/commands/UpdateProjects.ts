import { Client, MessageAttachment, MessageCollector, TextBasedChannel, TextChannel } from "discord.js";
import sleepMs from "../Utils/sleep";
import fetch from "node-fetch";
import { createWriteStream, renameSync } from "fs";
import Project from "../Models/Project";
import replaceAll from "../Utils/String/replaceAll";
import projectEmbed from "../Utils/Embeds/ProjectEmbed";
import uniqueProjectName from "../Utils/Validators/UniqueProjectName";
import getDateTsForEvent from "../Utils/Discord/GetDateTsForEvent";

module.exports = {
    name: "update_project", 
    description: "Update a project", 
    options: [
        {
            name: "project_id", 
            description: "Identifiant du projet à modifier", 
            required: true, 
            type: "STRING"
        }, 
        {
            name: "updated_field",
            description: "Le champ à modifier", 
            autocomplete: true, 
            type: "STRING",
            required: true
        }, 
        {
            name: "new_value", 
            description: "La valeur valeur à saisir", 
            type: "STRING", 
            required: false,
        }
    ], 
    runSlash: async (client: Client, interaction: any) => {
        const projectId = interaction.options.getString("project_id");
        const updatedField = interaction.options.getString("updated_field");
        const newValue = interaction.options.getString("new_value");
        const possibleUpdatedField = ["projectName", "projectAdvancement", "projectDescription", "projectImage", "projectDeadline", "projectGh"];

        // Check : Channel
        if(interaction.channelId != process.env.BOT_CHANNEL) {
            return interaction.reply({
                content: "Vous ne pouvez pas utiliser cette commande dans ce salon !",
                ephemeral: true 
            })
        }

        // Check : Existence du projet
        let projectInfo = (await Project.findOne({ where: { projectId } }))?.dataValues;

        if(!projectInfo) {
            return interaction.reply({
                content: "Le projet demandé n'existe pas !", 
                ephemeral: true
            })
        }

        // Check : Update field dans la liste
        if(!possibleUpdatedField.includes(updatedField)) {
            return interaction.reply({
                content: "Vous devez sélectionner une valeur possible pour le champ à modifier !", 
                ephemeral: true
            });
        }

        if(updatedField == "projectImage") {
            interaction.deferReply({ ephemeral: true });

            const prompt = await interaction.channel.send("Saisissez la nouvelle image du projet");
            const messageCollector: MessageCollector = new MessageCollector(interaction.channel as TextBasedChannel);
            messageCollector.on("collect", async message => {
                if(message.attachments.size == 0) {
                    if(!message.author.bot) message.delete();
                    return;
                } else if(message.attachments.first()?.contentType !== "image/png") {
                    const response = await message.reply("Le format de l'image n'est pas bon ! Merci de ne rentrer que des images au format PNG !");
                    await sleepMs(2000);
                    response.delete();
                    message.delete();
                    return;
                }
                messageCollector.stop();
            
                // Save the img
                const imageDiscordLocalization = message.attachments.first()?.proxyURL as string;
                const data = (await (await fetch(imageDiscordLocalization)).buffer());

                const stream = createWriteStream("uploads/project/" + projectInfo.projectName + ".png");
                stream.write(data);
                stream.on("drain", async () => {
                    const image = new MessageAttachment("uploads/project/" + projectInfo.projectName  + ".png");
                    
                    let imageLocalization = "attachment://" + replaceAll((projectInfo.projectName as string).normalize("NFD"), /[\u0300-\u036f]/g, "") 
                    imageLocalization = replaceAll(imageLocalization, " ", "_") + ".png";

                    // Create the embed
                    const embedInfo = {
                        projectAdvancement: projectInfo.projectAdvancement,
                        imageLocalization,
                        projectTitle: projectInfo.projectName,
                        deadline: projectInfo.deadline, 
                        description: projectInfo.projectDescription
                    }
                    const embeds = [projectEmbed(embedInfo)]; 

                    const messageProject = await (await client.channels.fetch(process.env.PROJECT_CHANNEL as string) as TextChannel).messages.fetch(projectInfo.messageProject as string);
                    await messageProject.edit({ embeds, files: [image] });

                    const logChannel = await client.channels.fetch(process.env.LOG_BOT_CHANNEL as string) as TextChannel;
                    logChannel.send({
                        content: interaction.user.username + " a modifié l'événement " + projectInfo.projectName + " !", 
                        embeds, 
                        files: [image]
                    });

                    stream.end();

                    await prompt.delete();
                    await message.delete();
                    
                    await interaction.editReply("L'événement a bien été modifié ! ✅");
                })
            })
        } else {
            // Udpate the different values
            if (updatedField == "projectName") {
                // Check : Length - Unique - Existence
                if(!newValue || newValue.trim() === "") {
                    return interaction.reply({
                        content: "La nouvelle valeur du titre ne peut pas être nulle !", 
                        ephemeral: true
                    })
                } else if (newValue.length > 30) {
                    return interaction.reply({
                        content: "La nouvelle valeur du titre ne peut pas faire plus de 30 caractères !", 
                        ephemeral: true
                    });
                } else if (!await uniqueProjectName(newValue)) {
                    return interaction.reply({
                        content: "Le nouveau nom du projet existe déjà !", 
                        ephemeral: true
                    });
                }
    
                // Modification du path vers l'image, du nom de l'image dans les fichiers, et du nom du projet
                const basePath = process.cwd() + "/" 
                renameSync(basePath + projectInfo.imageLocalization, basePath + "uploads/project/" + newValue + ".png");
                
                await Project.update( 
                    { projectName: newValue, imageLocalization: "uploads/project/" + newValue + ".png" }, 
                    { where: { projectId } }
                )
            } else if (updatedField == "projectDescription") {
                // Check presence
                if(!newValue || newValue.trim() === "") {
                    return interaction.reply({
                        content: "La nouvelle description ne peut pas être vide !", 
                        ephemeral: true
                    });
                }

                await Project.update(
                    { projectDescription: newValue },
                    { where: { projectId } } 
                )
            } else if (updatedField == "projectAdvancement") {
                if(!newValue || newValue.trim() === "") { // Check presence
                    return interaction.reply({
                        content: "La nouvelle valeur pour l'avancement du projet ne peut pas être vide !", 
                        ephemeral: true
                    });
                } 

                const advancementParsed = parseFloat(newValue);
                if (Number.isNaN(advancementParsed) || advancementParsed > 5 || advancementParsed < 0) { // Check format
                    return interaction.reply({
                        content: "L'avancement doit être un nombre réel compris entre 0 et 5 !",
                        ephemeral: true
                    })
                }

                await Project.update(
                    { projectAdvancement: newValue },
                    { where: { projectId } } 
                )
            } else if (updatedField == "projectDeadline") {
                // Check : Format    
                if (!newValue || newValue.trim() === "") {
                    return interaction.reply({
                        content: "La nouvelle valeur de la deadline ne peut pas être vide (si vous voulez l'effacer, rentrez null) !", 
                        ephemeral: true
                    })
                } else if (newValue == 'null') {
                    await Project.update(
                        { deadline: null }, 
                        { where: { projectId } }
                    )
                } else {
                    const dateTs = getDateTsForEvent(newValue, "Project");
                    if(dateTs == false) { // Not valid date
                        return interaction.reply({
                            content: "La deadline insérée n'est pas valide !\nMerci de rentrer votre deadline sous la forme DD/MM/YYYY !", 
                            ephemeral: true
                        })
                    } else if (dateTs < Date.now()) { // Deadline before date
                        return interaction.reply({
                            content: "La deadline insérée est déjà passé !",
                            ephemeral: true
                        })
                    }

                    await Project.update(
                        { deadline: dateTs }, 
                        { where: { projectId } }
                    )
                }
            } else if (updatedField == "projectGh") {
                if(!newValue || newValue.trim() === "") {
                    return interaction.reply({
                        content: "La nouvelle valeur du repo GitHub ne peut pas être vide (si vous voulez l'effacer, rentrez null) !", 
                        ephemeral: true
                    })
                } else if (!newValue.startsWith("https://github.com/")) {
                    if (newValue == "null") {
                        await Project.update(
                            { ghRepo: null }, 
                            { where: { projectId } }
                        )
                    } else {
                        return interaction.reply({
                            content: "La nouvelle valeur du repo GitHub ne correspond pas à un lien GitHub valide !", 
                            ephemeral: true
                        })
                    }
                } else {
                    await Project.update(
                        { ghRepo: newValue }, 
                        { where: { projectId } }
                    )
                }
            }
        
            // Generate and submit the new Embed
            projectInfo = (await Project.findOne({ 
                where: { projectId }, 
                attributes: ["projectAdvancement", "imageLocalization", "projectName", "deadline", "projectDescription", "messageProject"]
            }))?.dataValues;

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

            const message = await (await client.channels.fetch(process.env.PROJECT_CHANNEL as string) as TextChannel).messages.fetch(projectInfo.messageProject as string);
            message.edit({ embeds, files: [image] });

            const logChannel = await client.channels.fetch(process.env.LOG_BOT_CHANNEL as string) as TextBasedChannel;
            logChannel.send({
                content: interaction.user.username + " a modifié le projet " + projectInfo.projectName, 
                embeds, 
                files: [image]
            })

            return await interaction.reply({
                content: "Le projet a bien été modifié ! ✅", 
                ephemeral: true
            })
        }
    }   
}