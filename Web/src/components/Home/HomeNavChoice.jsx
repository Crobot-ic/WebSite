import "../../styles/css/index.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const HomeNavChoice = (props) => {
    const homeNavRef = useRef();
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [isAlreadyIntersecting, setIsAlreadyIntersecting] = useState(false);
    const { children, titleNav, buttonInfo, goTo, transitionInit } = props;
    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting)
        }, { threshold: 1, rootMargin: "20px" });
        observer.observe(homeNavRef.current);
    }, []);

    useEffect(() => {
        if (isIntersecting) {
            setIsAlreadyIntersecting(true);
        }
    }, [isIntersecting]);

    return (
        <div 
            className={`home-nav ${isAlreadyIntersecting ? "home-nav-visible" : ""}`}
            ref={homeNavRef}
        >
            <h2 
                className="home-nav-title"
                style={{ transform: `translateX(${transitionInit}px)` }}
            >{ titleNav }</h2>
            <div 
                style={{ transform: `translateX(${transitionInit}px)` }}
                className="home-nav-text"
            >
                { children }
            </div>
            <button 
                className="home-nav-button" 
                onClick={() => navigate(goTo)}
            >{ buttonInfo }</button>
        </div>
    );
}

export default HomeNavChoice;