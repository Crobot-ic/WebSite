import { useEffect, useRef, useState } from "react";
import "../../styles/css/index.css";

const Activity = (props) => {
    const { name, icon } = props; 
    const activityRef = useRef();
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [isAlreadyIntersecting, setIsAlreadyIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting)
        }, { rootMargin: "-100px", threshold: 1 });
        observer.observe(activityRef.current);
    }, []);

    useEffect(() => {
        if (isIntersecting == true) {
            setIsAlreadyIntersecting(true);
        }
    }, [isIntersecting]);

    return (
        <div 
            className={`activity ${isAlreadyIntersecting ? "activity-visible" : ""}`}
            ref={activityRef}
        >
            <div className="activity-shape">
                <div className="activity-shape-content">
                    <i className={ icon }></i>
                </div>
                <div className="activity-shape-overlay"></div> 
            </div>
            <h4 className="activity-description">{ name }</h4>
        </div>
    );
}

export default Activity;