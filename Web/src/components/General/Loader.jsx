import "../../styles/css/index.css";
import { createPortal } from "react-dom";

const Loader = () => {
    return createPortal(
        <>
            <div className="loader">
                <div className="loader-content"></div>
            </div>
        </>, 
    document.body)
} 

export default Loader;