import { Message, Client, MessageCollector, TextBasedChannel } from "discord.js"
import uniqueProjectName from "../Utils/Validators/UniqueProjectName";
import getDateTsForEvent from "../Utils/Discord/GetDateTsForEvent";
import fetch from "node-fetch";
import { createWriteStream } from "fs";
import Project from "../Models/Project";
import sleepMs from "../Utils/sleep";

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
    ],
    runSlash: async (client: Client, interaction: any) => {        
        const projectName = interaction.options.getString("nom_projet") as string;
        const description = interaction.options.getString("description") as string;
        const advancement = interaction.options.getString("avancement") as string;
        const deadline = interaction.options.getString("deadline") as string;

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
            const dateTs = getDateTsForEvent(deadline);
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
            }
            if(message.attachments.first()?.contentType !== "image/png") {
                const response = await message.reply("Le format de l'image n'est pas bon ! Merci de ne rentrer que des images au format PNG !");
                await sleepMs(2000);
                response.delete();
                message.delete();
                return;
            }
            messageCollector.stop();
            
            const data = (await (await fetch(message.attachments.first()?.proxyURL as any)).buffer());
            createWriteStream("uploads/project/" + projectName + ".png").write(data);

            // Add in the database
            await Project.create({
                projectName, 
                projectAdvancement: advancement, 
                projectDescription: description, 
                deadline, 
                imageLocalization: "uploads/project/" + projectName + ".png"
            });
            
            await prompt.delete();
            await message.delete();

            await interaction.editReply("L'événement a bien été ajouté ! ✅");
        });
    }
}