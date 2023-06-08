import { Message, Client, MessageCollector, TextBasedChannel, TextChannel, MessageAttachment, MessagePayload } from "discord.js"
import uniqueProjectName from "../Utils/Validators/UniqueProjectName";
import getDateTsForEvent from "../Utils/Discord/GetDateTsForEvent";
import fetch from "node-fetch";
import { createWriteStream } from "fs";
import Project from "../Models/Project";
import sleepMs from "../Utils/sleep";
import projectEmbed from "../Utils/Embeds/ProjectEmbed";
import replaceAll from "../Utils/String/replaceAll";

module.exports = {
    name: "create_project", 
    description: "Créer un nouveau projet", 
    options: [
        {
            name: "nom_projet",
            description: "Nom du projet", 
            required: true, 
            type: "STRING"
        }, 
        {
            name: "description",
            description: "Description du projet",
            required: true,
            type: "STRING",
        },
        {
            name: "avancement",
            description: "Avancement du projet (dans l'intervalle [0 - 5])",
            required: true,
            type: "STRING",
        },
        {
            name: "deadline",
            description: "Deadline du projet (rentrer sous le format : DD/MM/YYYY)",
            required: false,
            type: "STRING",
        },
        {
            name: "gh_repo", 
            description: "The Github repository's project", 
            type: "STRING",
            required: false
        }
    ],
    runSlash: async (client: Client, interaction: any) => {        
        const projectName = interaction.options.getString("nom_projet") as string;
        const description = interaction.options.getString("description") as string;
        const advancement = interaction.options.getString("avancement") as string;
        const deadline = interaction.options.getString("deadline") as string;
        let ghRepo = interaction.options.getString("gh_repo") as string | null;

        // Check channel
        if(interaction.channelId != process.env.BOT_CHANNEL) {
            return interaction.reply({
                content: "Vous ne pouvez pas utiliser cette commande dans ce salon !",
                ephemeral: true 
            })
        }
        
        // Check presence of information
        if(!projectName || projectName.trim() == "") {
            return interaction.reply({
                content: "Vous devez entrer un nom pour le projet !",
                ephemeral: true,
            });
        } else if(!description || description.trim() == "") {
            return interaction.reply({
                content: "Vous devez entrer une description pour le projet !",
                ephemeral: true,
            });
        } else if(!advancement || advancement.trim() == "") {
            return interaction.reply({
                content: "Vous devez renseigner l'état d'avancement du projet !",
                ephemeral: true,
            });
        }

        // Check data types of information
        const advancementParsed = parseFloat(advancement);
        if(Number.isNaN(advancementParsed) || advancementParsed > 5 || advancementParsed < 0) {
            return interaction.reply({
                content: "L'avancement doit être un nombre réel compris entre 0 et 5 !",
                ephemeral: true
            })
        } else if(ghRepo) {
            if(ghRepo.trim() == "") ghRepo = null;
            else if(!ghRepo.startsWith("https://github.com/")) {
                return interaction.reply({
                    content: "L'URL du projet GitHub n'est pas correcte !", 
                    ephemeral: true
                })
            }
        }

        // Check length for information
        if(projectName.length > 30) {
            return interaction.reply({
                content: "Le nom du projet est trop long !",
                ephemeral: true,
            });
        } 

        // Check unique for project name
        if(!await uniqueProjectName(projectName)) {
            return interaction.reply({
                content: "Un projet avec ce nom existe déjà !", 
                ephemeral: true
            })
        }

        // Check deadline if is set
        if(deadline) {
            const dateTs = getDateTsForEvent(deadline, "Project");
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
        }

        await interaction.deferReply();
        
        // Ask for images
        const prompt = await interaction.channel.send("Les informations saisies sont correctes ! Pour finir la création du projet, rentrer maintenant l'image !");
        const messageCollector: MessageCollector = new MessageCollector(interaction.channel as TextBasedChannel);
        messageCollector.on("collect", async (message: Message) => {
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
            
            const stream = createWriteStream("uploads/project/" + projectName + ".png")
            stream.write(data);
            stream.on("drain", async () => {
                const image = new MessageAttachment("uploads/project/" + projectName + ".png");

                let imageLocalization = "attachment://" + replaceAll((projectName as string).normalize("NFD"), /[\u0300-\u036f]/g, "") 
                imageLocalization = replaceAll(imageLocalization, " ", "_") + ".png";

                // Create the embed
                const embedInfo = {
                    projectAdvancement: advancement,
                    imageLocalization,
                    projectTitle: projectName,
                    deadline, 
                    description
                }
                const embeds = [projectEmbed(embedInfo, image)]; 

                // Send the message for the project
                const projectChannel = await client.channels.fetch(process.env.PROJECT_CHANNEL as string) as TextChannel;
                const messageProject = (await projectChannel.send({ embeds, files: [image] })).id;
                
                // Add in the database
                await Project.create({
                    projectName, 
                    projectAdvancement: advancement, 
                    projectDescription: description, 
                    deadline, 
                    ghRepo,
                    imageLocalization: "uploads/project/" + projectName + ".png",
                    messageProject, 
                });

                // Send the message for the log
                const logChannel = await client.channels.fetch(process.env.LOG_BOT_CHANNEL as string) as TextChannel;
                logChannel.send({
                    content: interaction.user.username + " a créé un nouvel événement !", 
                    embeds, 
                    files: [image]
                });

                stream.end();

                await prompt.delete();
                await message.delete();

                await interaction.editReply("L'événement a bien été ajouté ! ✅");
            })

        });
    }
}