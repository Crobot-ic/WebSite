import { CommandInteraction } from "discord.js";

const checkAdvancement: (advancement: number, interaction: CommandInteraction) => boolean = (advancement: number, interaction: CommandInteraction): boolean => {
    if (advancement > 5 || advancement < 0) {
        interaction.reply({
            content: "Vous devez entrer une valeur entre 0 et 5 pour l'avancement !", 
            ephemeral: true
        })
        return false;
    }

    return true;
}

export default checkAdvancement;