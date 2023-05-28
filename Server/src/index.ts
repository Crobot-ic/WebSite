import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors, { CorsOptions } from "cors";

import setup from "./Models/setup";

const app = express();

const PORT = process.env.PORT || 5050;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(process.env.URL_FRONT as CorsOptions));

app.listen(PORT, () => {
    setup();
    console.clear();
    console.log("We are listening on PORT", PORT);
});