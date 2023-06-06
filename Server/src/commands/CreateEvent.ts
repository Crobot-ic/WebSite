import { Client } from "discord.js";
import getDateTsForEvent from "../Utils/Discord/GetDateTsForEvent";
import getDurationOfEvents from "../Utils/Discord/GetDurationOfEvents";
import createEventEmbed from "../Utils/Discord/CreateEventEmbed";

module.exports = {
    name: "create_event", 
    description: "Créer un événement",
    options: [
        { 
            name: "event_name", 
            description: "Nom de l'événement", 
            required: true, 
            type: "STRING"
        },
        { 
            name: "description", 
            description: "Description de l'événement", 
            required: true, 
            type: "STRING"
        },
        { 
            name: "event_date", 
            description: "Date du début de l'événement (mettre sous le format : DD/MM/YYYY HH:MM", 
            required: true, 
            type: "STRING"
        },
        { 
            name: "event_duration", 
            description: "Durée de l'événement (mettre sous le format : DD:HH:MM", 
            required: true, 
            type: "STRING"
        },
    ],
    runSlash: (client: Client, interaction: any) => {
        const eventName = interaction.options.getString("event_name") as string;
        const description = interaction.options.getString("description") as string;
        const eventDate = interaction.options.getString("event_date") as string;
        const eventDuration = interaction.options.getString("event_duration") as string;
        console.log({ eventName, description, eventDate, eventDuration });
        
        // Check le salon
        if(interaction.channelId != process.env.BOT_CHANNEL) { 
            return interaction.reply({
                content: "Vous ne pouvez pas utiliser cette commande dans ce salon !",
                ephemeral: true 
            })
        }

        // Check presence of information
        if(!eventName || eventName.trim() == "") {
            return interaction.reply({
                content: "Vous devez entrer un nom pour l'événement !",
                ephemeral: true,
            });
        } else if(!description || description.trim() == "") {
            return interaction.reply({
                content: "Vous devez entrer une description pour l'événement !",
                ephemeral: true,
            });
        } else if(!eventDuration || eventDuration.trim() == "") {
            return interaction.reply({
                content: "Vous devez renseigner la durée de l'événement !",
                ephemeral: true,
            });
        } else if(!eventDate || eventDate.trim() == "") {
            return interaction.reply({
                content: "Vous devez renseigner la date de l'événement !",
                ephemeral: true,
            });
        }

        // Check length for informations
        if(eventName.length > 100) {
            return interaction.reply({
                content: "Le nom de l'événement doit faire moins de 100 caractères !", 
                ephemeral: true
            })
        }

        // Check event date
        const dateTs = getDateTsForEvent(eventDate, "Event");
        if(dateTs == false) { // Not valid date
            return interaction.reply({
                content: "La date insérée n'est pas valide !\nMerci de rentrer votre deadline sous la forme DD/MM/YYYY !", 
                ephemeral: true
            })
        } else if (dateTs < Date.now()) { // Deadline before date
            return interaction.reply({
                content: "La date insérée est déjà passé !",
                ephemeral: true
            })
        }

        // Check event duration
        const durationTs = getDurationOfEvents(eventDuration);
        if(durationTs === false) {
            return interaction.reply({
                content: "La durée saisie n'est pas correcte ! Merci de saisir une durée valide au format DD:HH:MM", 
                ephemeral: true
            })
        }

        // Créer l'embed
        const eventInfos = {
            eventDuration: durationTs, 
            eventName, 
            eventDescription: description,
            eventDate: dateTs
        }
        const embeds = [createEventEmbed(eventInfos)];

        // Envoie le message
        interaction.channel.send({ embeds })

        interaction.reply("We are working on that !");
    }   
}