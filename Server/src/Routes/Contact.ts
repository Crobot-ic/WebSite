import { Router } from "express"

const contactRoutes = Router();

contactRoutes.post("/sendMail", checkMailInformations, submitMail);

export default contactRoutes;