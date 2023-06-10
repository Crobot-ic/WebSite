import { MessageEmbed } from "discord.js";
import generateDateFromTs from "../generateDateFromTs";
import generateDurationFromTs from "../genrateDurationFromTs";

const createEventEmbed: (info: any) => MessageEmbed = (info: any): MessageEmbed => {    
    const embed = new MessageEmbed();
    
    const eventDate = generateDateFromTs(info.eventDate);
    console.log(info.eventDate);
    const eventDuration = generateDurationFromTs(info.eventDuration);
    
    embed.setTitle(info.eventName as string);
    embed.setDescription((info.eventDescription as string).slice(0, 1023));
    embed.setFields(
        { name: "Date : ", value: eventDate, inline: true },
        { name: "Durée :", value: eventDuration, inline: true }
    );
    embed.setColor("DARK_ORANGE");
    return embed;
}

export default createEventEmbed;