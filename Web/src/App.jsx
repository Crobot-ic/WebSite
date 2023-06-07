import HeaderBar from "./components/General/HeaderBar.jsx";
import FooterBar from "./components/General/FooterBar.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home.jsx";
import Events from "./views/Events.jsx";
import Project from "./views/Projects.jsx";

const App = () => {
    return (
        <>
            <HeaderBar />
            <main>
                <Routes>
                    <Route path="/" element={ <Home /> } />
                    <Route path="/events" element={ <Events /> } />
                    <Route path="/projects" element={ <Project /> } />
                </Routes>
            </main>
            <FooterBar />
        </>
    )
}

export default App;