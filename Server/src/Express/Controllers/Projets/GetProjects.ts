import { Request, Response } from 'express'
import Project from '../../../Models/Project';

const GetProjects = async (req: Request, res: Response) => {
    const allProjects = await Project.findAll({
        attributes: ["projectName", "projectAdvancement", "projectDescription", "deadline"]
    });
    const endedProject = new Array(), stillProject = new Array();

    for(let i = 0; i < allProjects.length; i++) {
        if(allProjects[i].dataValues.projectAdvancement === 5) endedProject.push(allProjects[i].dataValues);
        else stillProject.push(allProjects[i].dataValues);
    }

    return res.status(200).json({ endedProject, stillProject });
}

export default GetProjects;