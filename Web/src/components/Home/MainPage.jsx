import "../../styles/css/index.css";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
const MainPage = () => {
    return (
        <section className="main-page">
            <div className="main-page-info">
                <div className="main-page-info-title">
                    <h1 className="main-page-info-title-content">Crobot'ic</h1>
                    <img 
                        src={Logo} 
                        alt="Logo Crobot'ic" 
                        className="main-page-info-title-content-logo"
                    />
                </div>
                <h3 className="main-page-info-slogan">L'association de robotique de l'école Efrei Paris</h3>
            </div>
        </section>
    )
}

export default MainPage;