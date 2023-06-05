import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors, { CorsOptions } from "cors";

import setup from "./Models/Setup";
import contactRoutes from "./Routes/Contact";
import eventsRoutes from "./Routes/Events";
import projectsRoutes from "./Routes/Projects";
import addClient from "./Middlewares/Discord/AddBotInRequest";
import morgan from "morgan";
import { Client, Collection } from "discord.js";
import EventsHandlers from "./Utils/Handlers/EventsHandlers";
import CommandsHandlers from "./Utils/Handlers/CommandsHandlers";


// Partie DiscordJS
const client = new Client({ intents: 1 }) as any;
client.commands = new Collection();
client.login(process.env.BOT_TOKEN);

const mainDiscordJs = async () => {
    await EventsHandlers(client);
    await CommandsHandlers(client);
}

mainDiscordJs();


// Partie Express
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
    console.clear();
    console.log("We are listening on PORT", PORT);
});