import Contact from "../components/Home/Contact";
import MainPage from "../components/Home/MainPage";
import Services from "../components/Home/Services";
import HomeNavigation from "../components/Home/HomeNavigation";

const Home = () => {    
    return (
        <>
            <MainPage />  
            <Services />
            <HomeNavigation />
            <Contact />
        </>
    );
}

export default Home