import Project from "../../../Models/Project";
import { Request, Response } from "express";

const getImageProject = async (req: Request, res: Response) => {
    const { projectName } = req.params;
    const imageLocalization = (await Project.findOne({ 
        where: { projectName }
    }))?.dataValues.imageLocalization as string;
    return res.status(200).sendFile(process.cwd() + "/" + imageLocalization);
}

export default getImageProject;