import "../../styles/css/index.css";
import { useEffect, useState } from "react";
import informations from "../../../informations.json";
import Star from "./Star";

const ProjectCard = (props) => {
    const [image, setImage] = useState(null);
    const { projectName, deadline, projectAdvancement, projectDescription } = props.info;

    useEffect(() => {
        const fetchImg = async () => {
            const res = await fetch(informations.urlApi + "/projects/image/" + projectName);
            const data = await res.blob();
            const urlImage = URL.createObjectURL(data);
            setImage(urlImage);
        }

        fetchImg();
    }, [])

    return (
        <article className="project">
            <div className="project-picture">
                <img 
                    src={image} 
                    alt={projectName} 
                    className="project-picture-img"
                />
            </div>

            <div className="project-info">
                <h4 className="project-info-title">{ projectName }</h4>
                <p className="project-info-description">{ projectDescription }</p>
                <div className="project-info-time">
                    <div className="project-info-time-advancement">
                        <h6>Avancement</h6>
                        <div className="project-info-time-advancement-stars">
                            {Array.from(Array(5), (element, index) => (
                                <Star   
                                    filled={Math.min(Math.max(projectAdvancement - index, 0), 1)} 
                                    key={index}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <h6>Deadline</h6>
                        <p className="project-info-time-deadline">
                            {(!deadline) ? "Aucune deadline" : deadline}
                        </p>
                    </div>
                </div>
            </div>

            <div className="project-gh">
                <a href="https://github.com/Crobot-ic" target="_blank">
                    <i className="fa fa-github" aria-hidden="true"></i>
                </a>
            </div>
        </article>
    );
}

export default ProjectCard;