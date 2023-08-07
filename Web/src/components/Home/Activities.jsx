import "../../styles/css/index.css";
import informations from "../../../informations.json";
import Activity from "./Activity";

const Activities = () => {
    const { activities } = informations;

    return (
        <section className="activities">
            <h2 className="activities-title">Nos activités</h2>
            <div className="activities-content">
                {activities.map((activity, index) => (
                    <Activity 
                        icon={activity.icon} 
                        name={activity.name} 
                        key={index}
                    />
                ))}
            </div>
        </section>
    );
}

export default Activities;