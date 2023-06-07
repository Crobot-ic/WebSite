import { useEffect, useState } from "react";
import informations from "../../informations.json";
import ProjectCard from "../components/Projects/ProjectCard";

const Project = () => {
    const [endedProjects, setEndedProjects] = useState([]); 
    const [stillProject, setStillProject] = useState([]); 

    useEffect(() => {
        const getProjects = async () => {
            const res = await fetch(informations.urlApi + "/projects");
            const data = (await res.json());
            console.log(data);
            setEndedProjects(data.endedProject);
            setStillProject(data.stillProject);
        }

        getProjects();
    }, []);

    return (
        <>
            {endedProjects.length != 0 &&
            <div className="ended-projects projects">
                <h2 className="projects-title">
                    Projets finis &nbsp;
                    <span>({endedProjects.length})</span>
                </h2>
                <div className="projects-list">
                    {endedProjects?.map((project, index) => (
                        <ProjectCard 
                            info={project} 
                            key={index} 
                        />
                    ))}
                </div>
            </div>}

            {stillProject.length != 0 && <div className="projects still-projects">
                <h2 className="projects-title">
                    Projets actuels &nbsp;
                    <span>({stillProject.length})</span>
                </h2>
                <div className="projects-list">
                    {stillProject?.map((project, index) => (
                        <ProjectCard 
                            info={project} 
                            key={index} 
                        />
                    ))}
                </div>
            </div>}
        </>
    );
}

export default Project;