import { useEffect, useState } from "react";
import informations from "../../../informations.json";
import "../../styles/css/index.css";

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
    })

    return (
        <article>
            <div>
                <img src={image} alt={projectName} />
            </div>
            <div>
                <h4>{ projectName }</h4>

            </div>
        </article>
    );
}

export default ProjectCard;