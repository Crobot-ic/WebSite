import "../../styles/css/index.css";
import informations from "../../../informations.json";
import Activity from "./Activity";

const Activities = () => {
    const { activities } = informations;

    return (
        <>
            <h2>Nos activités</h2>
            <div>
                {activities.map((activity, index) => (
                    <Activity 
                        icon={activity.icon} 
                        name={activity.name} 
                        key={index}
                    />
                ))}
            </div>
        </>
    );
}

export default Activities;