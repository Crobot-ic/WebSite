import Contact from "../components/Home/Contact";
import MainPage from "../components/Home/MainPage";
import Services from "../components/Home/Services";
import Partnership from "../components/Home/Partnership";
import HomeNavigation from "../components/Home/HomeNavigation";

const Home = () => {

    const goToPage = page => navigate(page);

    return (
        <>
            <MainPage />  
            {/* <Services /> */}
            <HomeNavigation />
            <Contact />
        </>
    );
}

export default Home