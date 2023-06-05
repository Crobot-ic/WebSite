import Project from "../../Models/Project";

const checkExistenceProjectId: (projectId: number) => Promise<boolean> = async (projectId: number): Promise<boolean> => {
    return (await Project.findOne({ 
        where: { projectId } 
    })) != null;
}

export default checkExistenceProjectId;