import HeaderBar from "./components/General/HeaderBar.jsx";
import FooterBar from "./components/General/FooterBar.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home.jsx";
import Events from "./views/Events.jsx";
import Project from "./views/Projects.jsx";
import LogRoute from "./views/LogRoute.jsx";
import Admin from "./views/Admin.jsx";
import Loader from "./components/General/Loader.jsx";

const App = () => {
    const logRoute = "/logAdmin";
    const adminRoute = "/admin/:token";

    return (
        <>
            <HeaderBar />
            <Loader />
            <main>
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/events" element={ <Events /> } />
                    <Route path="/projets" element={ <Project /> } />
                    <Route path={logRoute} element={ <LogRoute /> } />
                    <Route path={adminRoute} element={ <Admin /> } />
                </Routes>
            </main>
            <FooterBar />
        </>
    )
}

export default App;