import { Client } from "discord.js";
import Events from "../../Models/Events";
import createEventEmbed from "../../Utils/Embeds/CreateEventEmbed";

module.exports = {
    name: "see_event", 
    description: "Voir un événement en particulier", 
    options: [
        {
            name: "event_id", 
            type: "STRING", 
            required: true, 
            description: "L'identifiant de l'événement à voir"
        }
    ],
    runSlash: async (client: Client, interaction: any) => {
        const eventId = interaction.options.getString("event_id") as string;
        const eventInfo = (await Events.findOne({
            where: { eventId },
            attributes: ["eventName", "description", "duration", "startDate"]
        }))?.dataValues;

        if(!eventInfo) {
            return interaction.reply({
                content: "L'événement demandé n'existe pas !", 
                ephemeral: true
            })
        }

        const eventInfos = {
            eventDuration: eventInfo.duration, 
            eventName: eventInfo.eventName, 
            eventDescription: eventInfo.description,
            eventDate: eventInfo.startDate
        }
        const embeds = [createEventEmbed(eventInfos)];
        
        interaction.reply({ embeds, ephemeral: true })
    }
}   