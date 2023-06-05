import Project from "../../Models/Project"

const uniqueProjectName = async (projectName: string) => {
    const resDb = (await Project.findOne({
        where: { projectName }
    }));

    return resDb == null;
}

export default uniqueProjectName;