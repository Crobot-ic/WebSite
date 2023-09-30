import React, { useState } from 'react';
import "../../styles/css/index.css";
import { Link } from "react-router-dom";

const button = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setMenuOpen(!isMenuOpen);
    };
  

  return (
    <div>
      <button onClick={toggleMenu}>Menu</button>
      {isMenuOpen && (<div>
        <nav className="header-bar-nav-menu">
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
     <div className="header-bar-row" onClick={toggleMenu}>
     <i className={`fa fa-bars ${isMenuOpen ? "open" : ""}`} aria-hidden="true"></i>
   </div></div>
      )}
    </div>
  );
}

export default button;