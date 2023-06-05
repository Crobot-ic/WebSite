import { Client } from "discord.js";
import { glob } from "glob";
import { promisify } from "util";

const pGlob = promisify(glob);

export default async (client: Client) => {
    const allEvents = (await pGlob(`${process.cwd()}/src/events/**.ts`, {})) as Array<string>;
    allEvents.map(async (eventFile: string) => {
        const event = require(eventFile);
        
        console.log("Événement chargé : " + event.name);
        
        if(event.once) client.once(event.name, (...args: any) => event.execute(client, ...args));
        else client.on(event.name, (...args: any) => event.execute(client, ...args));
    })
}