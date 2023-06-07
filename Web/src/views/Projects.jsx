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
            setEndedProjects(data.endedProject);
            setStillProject(data.stillProject);
        }

        getProjects();
    }, []);

    return (
        <>
            <h2>Projets finis</h2>
            {endedProjects?.map((project, index) => (
                <ProjectCard 
                    info={project} 
                    key={index} 
                />
            ))}

            <h2>Projets actuels</h2>
            {stillProject?.map((project, index) => (
                <ProjectCard 
                    info={project} 
                    key={index} 
                />
            ))}
        </>
    );
}

export default Project;