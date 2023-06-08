import { MessageEmbed } from "discord.js";

const projectEmbed: (info: any) => MessageEmbed = (info: any): MessageEmbed => {
    const deadlineValue = (!info.deadline && info.deadline?.trim() != "") ? "Aucune dealine" : info.deadline;
    let advancementValue = "";
    for(let i = 0; i < info.projectAdvancement; i++) advancementValue += "⭐";
    if(advancementValue == "") advancementValue = "Projet non commencé !"

    const embed = new MessageEmbed();
    
    embed.setImage(info.imageLocalization as string);
    embed.setTitle(info.projectTitle);
    embed.setColor("DARK_ORANGE");
    embed.setDescription((info.description as string).slice(0, 4095));
    embed.setFields(
        { name: "Avancement", value: advancementValue, inline: true }, 
        { name: "Deadline", value: deadlineValue, inline: true }, 
    );
    
    return embed;
}

export default projectEmbed;