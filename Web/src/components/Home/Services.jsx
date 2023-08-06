import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import informations from "../../../informations.json";

const Services = () => {
    const activities = [
        {
            element: () => <FontAwesomeIcon icon="fa-solid fa-robot" />, 
            name: "Robotique"
        }, 
        {
            element: () => <FontAwesomeIcon icon="fa-solid fa-list-check" />,
            name: "Projets", 
        }, 
        {
            element: () => <FontAwesomeIcon icon="fa-solid fa-circle-plus" />, 
            name: "Découverte"
        }, 
        {
            element: () => <FontAwesomeIcon icon="fa-solid fa-user-group" />,
            name: "Cohésion"
        }, 
        {
            element: () => <FontAwesomeIcon icon="fa-solid fa-wifi" />,
            name: "IoT"
        }, 
        {
            element: () => <FontAwesomeIcon icon="fa-solid fa-code" />,
            name: "Programmation"
        }
    ]
    
    return (
        <h2>Nos activités</h2>
    );
}

export default Services;