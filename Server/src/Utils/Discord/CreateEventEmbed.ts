import { MessageEmbed } from "discord.js";

const createEventEmbed: (info: any) => MessageEmbed = (info: any): MessageEmbed => {
    const embed = new MessageEmbed();
    return embed;
}

export default createEventEmbed;