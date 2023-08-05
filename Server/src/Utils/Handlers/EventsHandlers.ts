import { Client } from "discord.js";
import { readdirSync } from "fs";
import chalk from "chalk";

export default async (client: Client) => {   
    const allEventsPath = process.cwd() + "/src/Discord/events";
    const allEventsFileName = readdirSync(allEventsPath);
    allEventsFileName.map((eventFile: string) => {
        const event = require(allEventsPath + "/" + eventFile);
        
        console.log(chalk.green("Événement chargé : " + event.name));
        
        if(event.once) client.once(event.name, (...args: any) => event.execute(client, ...args));
        else client.on(event.name, (...args: any) => event.execute(client, ...args));
    })
}