import Contact from "../components/Home/Contact";
import GoTo from "../components/Home/GoTo";
import MainPage from "../components/Home/MainPage";
import { useNavigate } from "react-router-dom";
import Services from "../components/Home/Services";
import Partnership from "../components/Home/Partnership";

const Home = () => {
    const navigate = useNavigate();

    const goToPage = page => navigate(page);

    return (
        <>
            <MainPage />  
            
            <Services />             
            
            <GoTo actionButton={() => goToPage("/events")} title="Nos événements" buttonName = "Voir nos événements">
                <p>Notre association possède des événements en tous genres : cohésions, séances, formations...</p>
            </GoTo>  

            <GoTo actionButton={() => goToPage("/projects")} title="Nos projets" buttonName = "Voir nos projets">
                <p>Notre association est basée sur la réalisation de projets ! Nous en réalisons tout le temps et nous orientons vers !</p>
            </GoTo>  
  
            <Contact />
        </>
    );
}

export default Home