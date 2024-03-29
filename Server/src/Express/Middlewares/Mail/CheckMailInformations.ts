import { NextFunction, Request, Response } from "express";
import checkMail from "../../../Utils/Validators/CheckMail";

const checkMailInformations = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    
    // Vérifie que toutes les informations soient remplies
    if(!req.body.subject || req.body.subject.trim() == "") {
        return res.status(400).json({ information: "Vous devez rentrer le sujet du message !" });
    }

    if(!req.body.email || req.body.email.trim() == "") {
        return res.status(400).json({ information: "Vous devez rentrer votre email !" })
    }

    if(!req.body.content || req.body.content.trim() == "") {
        return res.status(400).json({ information: "Vous devez rentrer le contenu du message !" });
    }

    if(!req.body.name || req.body.name.trim() == "") {
        return res.status(400).json({ information: "Vous devez rentrer votre nom !" });
    }

    // Vérifie les longueurs pour les différentes informations
    if(req.body.subject.length > 200) {
        return res.status(400).json({ information: "L'objet du message est trop long !" });
    }

    if(req.body.email.length > 200) {
        return res.status(400).json({ information: "L'adresse mail rentrée est trop longue !" });
    }   

    if(req.body.name.length > 50) {
        return res.status(400).json({ information: "Le nom saisi est trop long !" });
    }

    // Vérifie que l'adresse mail est valide.
    if(!checkMail(req.body.email)) {
        return res.status(400).json({ information: "Adresse mail invalide" });
    }
    
    next();
}

export default checkMailInformations;