import { Router } from "express"
import CheckMailInformations from "../Middlewares/Mail/CheckMailInformations";
import SubmitMail from "../Controllers/Contact/SubmitMail";

const contactRoutes = Router();

contactRoutes.post("/sendMail", CheckMailInformations, SubmitMail);

export default contactRoutes;