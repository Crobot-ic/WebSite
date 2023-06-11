import { Client } from "discord.js";
import Events from "../Models/Events";
import { Op } from "sequelize";
import generateDateFromTs from "../Utils/generateDateFromTs";

module.exports = {
    name: "incoming_event",     
    description: "Liste les événements à venir", 
    runSlash: async (client: Client, interaction: any) => {
        const incomingEvents = await Events.findAll({
            where: { startDate: { [Op.gt]: Date.now() } }, 
            attributes: ["eventName", "startDate", "eventId"]
        });

        let message = "Voici la liste des événements à venir :\n\n";

        for(let i = 0; i < incomingEvents.length; i++) {
            const { eventName, startDate, eventId } = incomingEvents[i].dataValues;
            const eventDate = generateDateFromTs(startDate as number);
            
            message += 
                "**Nom de l'événement :** " + eventName + "\n" + 
                "**Date de l'événement :** " + eventDate + "\n" +
                "**ID de l'événement :** " + eventId + "\n\n" + 
                "--------------------------------------------------------------------------------\n\n";
        }
        
        interaction.reply({
            content: message,   
            ephemeral: true
        })
    }
}