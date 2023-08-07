import Contact from "../components/Home/Contact";
import MainPage from "../components/Home/MainPage";
import Activities from "../components/Home/Activities";
import HomeNavigation from "../components/Home/HomeNavigation";

const Home = () => {    
    return (
        <>
            <MainPage />  
            <Activities />
            <HomeNavigation />
            <Contact />
        </>
    );
}

export default Home