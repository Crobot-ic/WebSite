import { Client } from "discord.js";
import Events from "../../Models/Events";
import generateDateFromTs from "../../Utils/generateDateFromTs";

module.exports = {
    name: "all_events", 
    description: "Liste tous les événements passés et à venir", 
    runSlash: async (client: Client, interaction: any) => {
        const incomingEvents = await Events.findAll({ 
            attributes: ["eventName", "startDate", "eventId"] 
        }), message = {
            pastEvents: "Voici la liste des événements passés :\n\n",
            incomingEvents: "Voici la liste des événements à venir :\n\n",
        }, now = Date.now();

        for(let i = 0; i < incomingEvents.length; i++) {
            const { eventName, startDate, eventId } = incomingEvents[i].dataValues;
            const eventDate = generateDateFromTs(startDate as number);
            const addToMessage =
                "**Nom de l'événement :** " + eventName + "\n" + 
                "**Date de l'événement :** " + eventDate + "\n" +
                "**ID de l'événement :** " + eventId + "\n\n" + 
                "--------------------------------------------------------------------------------\n\n"; 

            if(now < startDate) message.incomingEvents += addToMessage;
            else message.pastEvents += addToMessage;
        }

        if(message.incomingEvents === "Voici la liste des événements à venir :\n\n") {
            message.incomingEvents = "Il n'y a aucun événement à venir !\n\n";
        } 
        
        if(message.pastEvents === "Voici la liste des événements passés :\n\n") {
            message.pastEvents = "Il n'y a aucun événement passé !";        
        }

        const finalMessage = message.incomingEvents + message.pastEvents;

        if(finalMessage.length < 2000) {
            interaction.reply({
                content: finalMessage, 
                ephemeral: true
            });
        } else {
            let lowerBound = 0;

            while(lowerBound < finalMessage.length) {
                const currentMessage = finalMessage.slice(lowerBound, lowerBound + 1999);
                lowerBound += 2000;
                await interaction.user.send(currentMessage)
            }

            interaction.reply({
                content: "Nous vous avons envoyé la liste de tous nos événements en MP !", 
                ephemeral: true
            });
        }
    }
}