import { CommandInteraction } from "discord.js";
import channelsInformations from "../../../ChannelsConfig.json";

const checkBotChannel = (interaction: CommandInteraction, runMode: "dev" | "prod"): boolean => {
    if(interaction.channelId != channelsInformations[runMode].BOT_CHANNEL) {
        interaction.reply({
            content: "Vous ne pouvez pas utiliser cette commande dans ce salon !",
            ephemeral: true 
        });

        return false;
    }

    return true;
}

export default checkBotChannel;