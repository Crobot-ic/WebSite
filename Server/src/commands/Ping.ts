import { Client, Interaction } from "discord.js";

module.exports = {
    name: "ping", 
    description: "Ping the user", 
    runSlash: (client: Client, interaction: Interaction) => {
        interaction.channel?.send("Hello !");
    }
}