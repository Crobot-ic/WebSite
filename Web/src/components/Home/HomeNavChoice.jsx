import "../../styles/css/index.css";
import { useNavigate } from "react-router-dom";

const HomeNavChoice = (props) => {
    const { children, titleNav, buttonInfo, goTo } = props;
    const navigate = useNavigate();

    return (
        <div className="home-nav">
            <h2 className="home-nav-title">{ titleNav }</h2>
            { children }
            <button className="home-nav-button" onClick={() => navigate(goTo)} >{ buttonInfo }</button>
        </div>
    );
}

export default HomeNavChoice;