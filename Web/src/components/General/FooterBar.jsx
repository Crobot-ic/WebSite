import { Link } from "react-router-dom";
import "../../styles/css/index.css";

const FooterBar = () => {
    return (
        <footer className="footer">
            <div className="footer-bar">
                <div className="footer-bar-row">
                    <a href="https://goo.gl/maps/r7GSTLVWPkgUmgV38" target="_blank">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                    </a>

                    <a href="mailto:crobotic.asso@gmail.com">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                    </a>

                    <a href="https://www.instagram.com/efreicrobotic/" target="_blank">
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                    </a>

                    <a href="https://github.com/Crobot-ic" target="_blank">
                        <i className="fa fa-github" aria-hidden="true"></i>
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