import { CommandInteraction } from "discord.js";
import getDateTsForEvent from "../Discord/GetDateTsForEvent";

const checkProjectDeadline = (deadline: string, interaction: CommandInteraction): boolean => {
    if(deadline) {
        const dateTs = getDateTsForEvent(deadline, "Project");
        if(dateTs == false) { // Not valid date
            interaction.reply({
                content: "La deadline insérée n'est pas valide !\nMerci de rentrer votre deadline sous la forme DD/MM/YYYY !", 
                ephemeral: true
            });
            return false;
        } else if (dateTs < Date.now()) { // Deadline before date
            interaction.reply({
                content: "La deadline insérée est déjà passé !",
                ephemeral: true
            });
            return false;
        }
    }

    return true;
}

export default checkProjectDeadline;