import { Client, TextBasedChannel } from "discord.js";
import Events from "../../Models/Events";
import createEventEmbed from "../../Utils/Embeds/CreateEventEmbed";
import channelsInformations from "../../../ChannelsConfig.json";

module.exports = {
    name: "delete_event", 
    description: "Supprime l'événement dont l'identifiant correspond aux paramètres de la commande",
    options: [
        {
            name: "event_id", 
            description: "Identifiant de l'événement à supprimer", 
            type: "STRING",
            required: true
        }
    ], 
    runSlash: async (client: Client, interaction: any) => {
        if(process.env.MODE != "prod" && process.env.MODE != "dev") {
            return interaction.reply({ 
                content: "Wooops, something went wrong !", 
                ephemeral: true
            }); 
        }
        const runMode = process.env.MODE;
        
        // Check channel
        if(interaction.channelId != channelsInformations[runMode].BOT_CHANNEL) { 
            return interaction.reply({
                content: "Vous ne pouvez pas utiliser cette commande dans ce salon !",
                ephemeral: true 
            })
        }

        // Check presence event_id
        const eventId = interaction.options.getString("event_id");
        if(!eventId || eventId.trim() === "") {
            return interaction.reply({
                content: "Vous devez saisir l'identifiant de l'événement à supprimer !", 
                ephemeral: true
            })
        }

        // Get the information in the DB
        const eventInfo = (await Events.findOne({
            where: { eventId },
            attributes: ["eventName", "description", "duration", "startDate"]
        }))?.dataValues;
        
        // Check Existence de l'événement
        if(!eventInfo) {
            return interaction.reply({
                content: "L'événement que vous voulez supprimer n'existe pas !", 
                ephemeral: true
            })
        }

        // Generate Embed
        const eventInfos = {
            eventDuration: eventInfo.duration, 
            eventName: eventInfo.eventName, 
            eventDescription: eventInfo.description,
            eventDate: eventInfo.startDate
        }
        const embeds = [createEventEmbed(eventInfos)];

        // Delete Event
        await Events.destroy({ where: { eventId } });

        // Send log with Embed
        const logChannel = await client.channels.fetch(channelsInformations[runMode].LOG_BOT_CHANNEL) as TextBasedChannel;
        logChannel.send({
            content: interaction.user.username + " a supprimé l'événement suivant :", 
            embeds
        })

        // Respond to interaction
        interaction.reply({
            content: "L'événement a été supprimé avec succès !", 
            ephemeral: true
        })
    }
}