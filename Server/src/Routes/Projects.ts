import { Router } from "express";
import GetProjects from "../Controllers/Projets/GetProjects";
import getImageProject from "../Controllers/Projets/GetImagePresentation";

const projectsRoutes = Router();

projectsRoutes.get("/", GetProjects);
projectsRoutes.get("/image/:projectName", getImageProject);

export default projectsRoutes;