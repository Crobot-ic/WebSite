import { Router } from "express";
import getEvents from "../Controllers/Events/GetEvents";

const eventsRoutes = Router();

eventsRoutes.get("/", getEvents);

export default eventsRoutes;