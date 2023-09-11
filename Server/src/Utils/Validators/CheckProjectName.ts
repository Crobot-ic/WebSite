import { CommandInteraction } from "discord.js";
import uniqueProjectName from "./UniqueProjectName";

const checkProjectName = async (name: string, interaction: CommandInteraction): Promise<boolean> => {
    if(name.length > 30) {
        interaction.reply({
            content: "Le nom du projet est trop long. Merci de rentrer un projet d'une longueur maximale de 30 caractères !",
            ephemeral: true,
        });
        
        return false;
    }
        
    if(!await uniqueProjectName(name)) {
        interaction.reply({
            content: "Un projet avec ce nom existe déjà !", 
            ephemeral: true
        });

        return false;
    }

    return true;
}

export default checkProjectName;