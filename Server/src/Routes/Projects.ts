import { Router } from "express";
import GetProjects from "../Controllers/Projets/GetProjects";

const projectsRoutes = Router();

projectsRoutes.get("/", GetProjects);

export default projectsRoutes;