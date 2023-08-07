import "../../styles/css/index.css";
import informations from "../../../informations.json";
import Service from "./Service";

const Services = () => {
    const { activities } = informations;

    return (
        <>
            <h2>Nos activités</h2>
            {activities.map(activity => <Service icon={activity.icon}  name={activity.name} />)}
        </>
    );
}

export default Services;