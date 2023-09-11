import { Client, CommandInteraction } from "discord.js";

const SeeProject = (client: Client, interaction: CommandInteraction) => {
    // Check si la commande a été fait dans le bon channel
    // Récupère l'ID du projet
    // Call DB pour récupérer toutes les informations
    // Check l'existence du projet
    // Fetch l'image
    // Créer l'Embed
    // Envoyer le message d'informations

    interaction.reply({
        ephemeral: true, 
        content: "We are working on that !"
    });
}

export default SeeProject;