import { Link } from "react-router-dom";
import "../../styles/css/index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FooterBar = () => {
    return (
        <footer className="footer">
            <div className="footer-bar">
                <div className="footer-bar-row">
                    <a href="https://goo.gl/maps/r7GSTLVWPkgUmgV38" target="_blank">
                        <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                    </a>

                    <a href="mailto:crobotic.asso@gmail.com">
                        <FontAwesomeIcon icon="fa-solid fa-envelope" />
                    </a>

                    <a href="https://www.instagram.com/efreicrobotic/" target="_blank">
                        <FontAwesomeIcon icon="fa-brands fa-instagram" />
                    </a>

                    <a href="https://github.com/Crobot-ic" target="_blank">
                        <FontAwesomeIcon icon="fa-brands fa-github" />
                    </a>
                </div>

                <div className="footer-bar-row">
                    <ul>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/projects">Projets</Link></li>
                        <li><Link to="/events">Événements</Link></li>
                    </ul>
                </div>

                <div className="footer-bar-row">
                    <p>Crobot'ic © 2023 | All rights reserved</p>
                </div>
            </div>
        </footer>
    )
}

export default FooterBar;