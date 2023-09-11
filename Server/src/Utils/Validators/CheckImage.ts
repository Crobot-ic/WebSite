import { CommandInteraction } from "discord.js";

const checkImage = (image: any, interaction: CommandInteraction): boolean => {
    if(image.contentType === "image/png" || image.contentType === "image/jpg") return true;

    interaction.reply({
        content: "Vous devez rentrez une image valide au format PNG ou JPG !", 
        ephemeral: true
    })

    return false;
}

export default checkImage;