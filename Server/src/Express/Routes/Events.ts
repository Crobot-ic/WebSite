import { Router } from "express";
import GetEvents from "../Controllers/Events/GetEvents";

const eventsRoutes = Router();

eventsRoutes.get("/", GetEvents);

export default eventsRoutes;