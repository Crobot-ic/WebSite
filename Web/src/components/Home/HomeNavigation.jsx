import "../../styles/css/index.css";
import HomeNavChoice from "./HomeNavChoice";

const HomeNavigation = () => {
    return (
        <section className="home-navigation">
            <HomeNavChoice titleNav="Nos projets" buttonInfo="Découvez-les !" goTo="/projects">
                <p className="home-nav-text">L'association possède d'innombrables projets tous aussi intéressants les uns que les autres !</p>
            </HomeNavChoice>

            <HomeNavChoice titleNav="Nos événements" buttonInfo="Découvez-les !" goTo="/events">
                <p className="home-nav-text">
                    Notre engagement : un événement minimum par semaine !<br />
                    Avancement de projets, découverte technologique, jeux, cohésion, tellement de possibilités !<br />
                    Envie d'en savoir plus sur les différents événements passés et à venir ?
                </p>
            </HomeNavChoice>

            <span className="home-navigation-or">ou</span>
            <div className="home-navigation-sep"></div>
        </section>
    );
}

export default HomeNavigation;