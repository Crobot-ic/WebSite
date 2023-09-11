import { CommandInteraction, Client } from "discord.js";

const listProjects = (client: Client, interaction: CommandInteraction) => {
    return interaction.reply("Test")
}

export default listProjects;