import { CommandInteraction } from "discord.js";

const checkGHRepo = (repo: string, interaction: CommandInteraction): boolean => {
    if(!repo.startsWith("https://github.com/")) {
        interaction.reply({
            content: "L'URL du projet GitHub n'est pas correcte !", 
            ephemeral: true
        })

        return false;
    }

    return true;
}

export default checkGHRepo;