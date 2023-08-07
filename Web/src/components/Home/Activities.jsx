import "../../styles/css/index.css";
import informations from "../../../informations.json";
import Activity from "./Activity";
import { useRef, useState, useEffect } from "react";

const Activities = () => {
    const { activities } = informations;
    const [isIntersected, setIsIntersected] = useState(false);
    const [isAlreadyIntersected, setIsAlreadyIntersected] = useState(false);
    const componentRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersected(entry.isIntersecting);
        }, { threshold: 1 });
        observer.observe(componentRef.current);
    
    }, []);
    
    useEffect(() => {
        if (isIntersected && !isAlreadyIntersected) {
            setIsAlreadyIntersected(true);
        }
    }, [isIntersected]);

    return (
        <section className="activities">
            <div 
                className={`activities-title ${isAlreadyIntersected ? "activities-title-visible" : ""}`}
                ref={componentRef}
            >
                <h2 className="activities-title-content">Nos activités</h2>
            </div>
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