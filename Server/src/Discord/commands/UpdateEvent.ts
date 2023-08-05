import { Client, TextBasedChannel } from "discord.js";
import Events from "../../Models/Events";
import getDurationOfEvents from "../../Utils/Discord/GetDurationOfEvents";
import getDateTsForEvent from "../../Utils/Discord/GetDateTsForEvent";
import createEventEmbed from "../../Utils/Embeds/CreateEventEmbed";

module.exports = {
    name: "update_event", 
    description: "Modife un événement grâce aux différents paramètres de commande", 
    options: [
        {
            name: "event_id", 
            description: "Identifiant de l'événement à modifier", 
            type: "STRING", 
            required: true
        }, 
        {
            name: "updated_field", 
            description: "Champ de l'événement à modifier", 
            type: 'STRING', 
            autocomplete: true,
            required: true
        },
        {
            name: "new_value", 
            description: "La nouvelle valeur à assigner", 
            type: "STRING", 
            required: true
        }
    ], 
    runSlash: async (client: Client, interaction: any) => {
        // Check : Channel
        if(interaction.channelId != process.env.BOT_CHANNEL) {
            return interaction.reply({
                content: "Vous ne pouvez pas utiliser cette commande dans ce salon !",
                ephemeral: true 
            })
        }

        // Check information presence
        const eventId = interaction.options.getString("event_id");
        const updatedField = interaction.options.getString("updated_field");
        const newValue = interaction.options.getString("new_value");
        if (!eventId || eventId.trim() === "") {
            return interaction.reply({
                content: "Vous devez renseigner l'identifiant de l'événement à modifier", 
                ephemeral: true
            })
        } else if (!updatedField || updatedField.trim() === "") {
            return interaction.reply({
                content: "Vous devez renseigner le champ de l'événement à modifier", 
                ephemeral: true
            })
        } else if (!newValue || newValue.trim() === "") {
            return interaction.reply({
                content: "Vous devez renseigner la nouvelle valeur pour le champ à modifier", 
                ephemeral: true
            });
        }

        // Check the existence of the event
        if(await Events.count({ where: { eventId } }) === 0) {
            return interaction.reply({
                content: "L'événement que vous voulez modifier n'existe pas !", 
                ephemeral: true
            });
        }

        // Check updated_field correct
        const updatedFieldPossibility = ["duration", "eventDate", "eventName", "description"];
        if (!updatedFieldPossibility.includes(updatedField)) {
            return interaction.reply({
                content: "Vous devez saisir une valeur parmi les valeurs proposées pour le champ à modifier",
                ephemeral: true
            });
        }

        if (updatedField === "duration") {
            const durationTs = getDurationOfEvents(newValue);
            if(durationTs === false || durationTs === 0) {
                return interaction.reply({
                    content: "La durée saisie n'est pas correcte ! Merci de saisir une durée valide au format DD:HH:MM", 
                    ephemeral: true
                })
            } else {
                await Events.update(
                    { duration: durationTs },
                    { where: { eventId } }
                )
            }
        } else if (updatedField === "eventDate") {
            const dateTs = getDateTsForEvent(newValue, "Event");
            if(dateTs == false) { // Not valid date
                return interaction.reply({
                    content: "La date insérée n'est pas valide !\nMerci de rentrer votre deadline sous la forme DD/MM/YYYY HH:MM!", 
                    ephemeral: true
                })
            } else if (dateTs < Date.now()) { // Deadline before date
                return interaction.reply({
                    content: "La date insérée est déjà passé !",
                    ephemeral: true
                })
            }

            await Events.update(
                { startDate: dateTs }, 
                { where: { eventId } }
            );
        } else if (updatedField === "eventName") {
            if(newValue.length > 100) {
                return interaction.reply({
                    content: "Le nom de l'événement doit faire moins de 100 caractères !", 
                    ephemeral: true
                })
            }

            await Events.update(
                { eventName: newValue },
                { where: { eventId } }
            )
        } else {
            await Events.update(
                { description: newValue }, 
                { where: { eventId } }
            )
        }

        // Create new Embed
        const eventInfo = (await Events.findOne({
            where: { eventId },
            attributes: ["eventName", "description", "duration", "startDate"]
        }))?.dataValues;

        const eventInfos = {
            eventDuration: eventInfo.duration, 
            eventName: eventInfo.eventName, 
            eventDescription: eventInfo.description,
            eventDate: eventInfo.startDate
        }, embeds = [createEventEmbed(eventInfos)];

        // Send Embed in the LOG_BOT_CHANNEL
        const logChannel = await client.channels.fetch(process.env.LOG_BOT_CHANNEL as string) as TextBasedChannel;
        logChannel.send({
            content: interaction.user.username + " a modifié un événement !", 
            embeds
        });

        // Create and send update Event message
        const eventChannel = await client.channels.fetch(process.env.EVENT_CHANNEL as string) as TextBasedChannel;
        eventChannel.send({
            // content: "Hello @everyone, \nUn événement a été modifié ! Voici le nouvel événement :", 
            embeds
        })

        // Respond to the interaction
        interaction.reply({
            content: "Vous avez bien modifié l'événement ! ✅", 
            ephemeral: true
        })
    }
}