import { Client, CommandInteraction } from "discord.js";
import channelsInformations from "../../../../ChannelsConfig.json";
import checkBotChannel from "../../../Utils/Discord/CheckBotChannel";
import checkProjectName from "../../../Utils/Validators/CheckProjectName";
import checkAdvancement from "../../../Utils/Validators/CheckAdvancement";
import checkImage from "../../../Utils/Validators/CheckImage";
import checkGHRepo from "../../../Utils/Validators/CheckGHRepo";
import checkProjectDeadline from "../../../Utils/Validators/CheckProjectDeadline";

const createProject = async (client: Client, interaction: CommandInteraction) => {
    const projectName = interaction.options.getString("name", true);
    const description = interaction.options.getString("description", true);
    const advancement = interaction.options.getNumber("advancement", true);
    const image = interaction.options.getAttachment("image", true);
    const deadline = interaction.options.getString("deadline", false);
    let ghRepo = interaction.options.getString("gh_repo", false);

    if(process.env.MODE != "prod" && process.env.MODE != "dev") { // Check env MODE variable
        return interaction.reply({ content: "Wooops, something went wrong !", ephemeral: true }); 
    }    
    const runMode = process.env.MODE;

    if(!checkBotChannel(interaction, runMode)) return; // Check if the command has been made in the good channel
    
    // Check informations
    if (!await checkProjectName(projectName, interaction)) return;
    if (!checkAdvancement(advancement, interaction)) return;
    if (!checkImage(image, interaction)) return;
    if (ghRepo && !checkGHRepo(ghRepo, interaction)) return;
    if (deadline && !checkProjectDeadline(deadline, interaction)) return;

    // Save the image
    // Add in DB
    // Create the embed for the message
    // Create the message for the project
    // Send the message for the project
    // Reply to the interaction 
    // Send a message in the channel for the log
}

export default createProject;