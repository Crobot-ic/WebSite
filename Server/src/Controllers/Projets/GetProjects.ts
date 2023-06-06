import { Request, Response } from 'express'
import Project from '../../Models/Project';

const GetProjects = async (req: Request, res: Response) => {
    const allProjects = await Project.findAll({
        attributes: ["projectName", "projectAdvancement", "projectDescription", "deadline"]
    });

    return res.status(200).json({ allProjects });
}

export default GetProjects;