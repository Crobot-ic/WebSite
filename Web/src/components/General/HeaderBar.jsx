import "../../styles/css/index.css";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

import React, { useState } from "react";
function h() {
    return (
      <nav className="header-bar-nav-menu">
        <ul className="header-bar-nav-ul-menu">
          <li className="header-bar-nav-ul-choice-menu">
            <Link to="/">Accueil</Link>
          </li>
          <li className="header-bar-nav-ul-choice-menu">
            <Link to="/projects">Projets</Link>
          </li>
          <li className="header-bar-nav-ul-choice-menu">
            <Link to="/events">Événements</Link>
          </li>
        </ul>
      </nav>
    );
  }
const HeaderBar = () => {

    const [isHVisible, setIsHVisible] = useState(false);

  const toggleHVisibility = () => {
    setIsHVisible(!isHVisible);
  };

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
                <div className="header-bar-name">
                        <h1 className="header-bar-title">Crobot'ic</h1>
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
                <div className="header-bar-row">
                <button onClick={toggleHVisibility}>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </button>
                </div></div>
                {isHVisible && h()}
                
               
        </header>
    )
}  

export default HeaderBar;