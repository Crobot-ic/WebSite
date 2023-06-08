import { Client } from "discord.js";

module.exports = {
    name: "update_project", 
    description: "Update a project", 
    options: [
        {
            name: "project_id", 
            description: "Identifiant du projet à modifier", 
            required: true, 
            type: "STRING"
        }, 
        {
            name: "updated_field",
            description: "Le champ à modifier", 
            autocomplete: true, 
            type: "STRING",
            required: true
        }, 
        {
            name: "new_value", 
            description: "La valeur valeur à saisir", 
            type: "STRING", 
            required: false,
        }
    ], 
    runSlash: async (client: Client, interaction: any) => {
        const projectId = interaction.options.getString("project_id");
        const updatedField = interaction.options.getString("updated_field");
        const newValue = interaction.options.getString("new_value");

        // Check : Channel - Information insérée - Update field dans la liste - 
        console.log({ projectId, updatedField, newValue });
        interaction.reply("We are working on that !");
    }   
}