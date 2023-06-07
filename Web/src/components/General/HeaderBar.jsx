import "../../styles/css/index.css";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

const HeaderBar = () => {
    return (
        <header className="header">
            <div className="header-bar">
                <div className="header-bar-logo">
                    <img 
                        src={Logo} 
                        alt="Logo Crobot'ic" 
                        className="header-bar-logo-content"
                    />
                </div>
        
                <nav className="header-bar-nav">
                    <ul className="header-bar-nav-ul">
                        <li className="header-bar-nav-ul-choice">
                            <Link to="/">Accueil</Link>
                        </li>
                        <li className="header-bar-nav-ul-choice">
                            <Link to="/projects">Projets</Link>
                        </li>
                        <li className="header-bar-nav-ul-choice">
                            <Link to="/events">Événements</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}  

export default HeaderBar;