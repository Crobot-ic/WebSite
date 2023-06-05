import { MessageEmbed } from "discord.js";

const EmbedContact: (subject: string, name: string, email: string, content: string) => MessageEmbed = (subject: string, name: string, email: string, content: string): MessageEmbed => {
    // Create the embed
    const embed = new MessageEmbed();
    embed.setTitle("Nouveau message - " + subject);
    embed.setDescription("Un nouveau message vient d'arriver depuis le site !");
    embed.setColor("DARK_ORANGE");
    embed.setFields(
        {  name: "Nom :", value: name, inline: true }, 
        {  name: "Email :", value: email, inline: true }, 
        {  name: "Contenu :", value: content.slice(0, 1022), inline: false }, 
    );

    return embed;
}

export default EmbedContact;