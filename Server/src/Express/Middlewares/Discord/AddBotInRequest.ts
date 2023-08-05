import { Client } from "discord.js";
import { NextFunction, Response } from "express";

const addClient = (client: Client) => {
    return (req: any, res: Response, next: NextFunction) => {
        req.clientDiscord = client;
        next();
    }
}

export default addClient;