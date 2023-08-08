import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors, { CorsOptions } from "cors";

import setup from "./Models/Setup";
import contactRoutes from "./Express/Routes/Contact";
import eventsRoutes from "./Express/Routes/Events";
import projectsRoutes from "./Express/Routes/Projects";
import addClient from "./Express/Middlewares/Discord/AddBotInRequest";
import morgan from "morgan";
import { Client, Collection } from "discord.js";
import EventsHandlers from "./Utils/Handlers/EventsHandlers";
import CommandsHandlers from "./Utils/Handlers/CommandsHandlers";

// Partie DiscordJS
const client = new Client({ intents: 3276799 }) as any;
client.commands = new Collection();
client.login(process.env.BOT_TOKEN);

const mainDiscordJs = async () => {
    console.clear();
    await EventsHandlers(client);
    await CommandsHandlers(client);
}

// Partie Express
const mainExpress = () => {
    const app = express();
    const PORT = process.env.PORT || 5050;

    app.use(morgan("combined"));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors(process.env.URL_FRONT as CorsOptions));
    app.use(addClient(client));

    app.use("/contact", contactRoutes);
    app.use("/events", eventsRoutes);
    app.use("/projects", projectsRoutes);

    app.listen(PORT, () => {
        setup();
        console.log("We are listening on PORT", PORT);
    });   
}

const main = async () => {
    await mainDiscordJs();
    mainExpress();
}

main();