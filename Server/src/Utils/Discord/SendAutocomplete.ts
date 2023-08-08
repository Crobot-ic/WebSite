import { AutocompleteInteraction } from "discord.js";

const sendAutocompleteInteraction: (interaction: AutocompleteInteraction) => void = (interaction: AutocompleteInteraction): void => {
    if(interaction.commandName === "update_project") {
        interaction.respond([
            { name: "Nom du projet", value: "projectName" }, 
            { name: "Avancement du projet", value: "projectAdvancement" }, 
            { name: "Description du projet", value: "projectDescription" }, 
            { name: "Image du projet", value: "projectImage" },
            { name: "Deadline du projet", value: "projectDeadline" }, 
            { name: "GitHub", value: "projectGh" }
        ])
    } else if (interaction.commandName === "create_event") {
        interaction.respond([
            { name: "InnovationLab", value: "InnovationLab" }, 
            { name: "Discord", value: "Discord" },
            { name: "Efrei", value: "Efrei" }
        ])
    }
     else {
        interaction.respond([
            { name: "Durée de l'événement", value: "duration" }, 
            { name: "Date de l'événeemnt", value: "eventDate" }, 
            { name: "Nom de l'événement", value: "eventName" }, 
            { name: "Description", value: "description" }
        ])
    }
}

export default sendAutocompleteInteraction;