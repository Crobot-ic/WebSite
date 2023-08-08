import "../../styles/css/index.css";
import InnovationLabImg from "../../assets/InnovationLab.png";
import EfreiImg from "../../assets/Efrei.png";
import DiscordImg from "../../assets/Discord.png";

const EventCard = (props) => {
    const { place, startTime, duration, description, eventName } = props;

    const placeImg = {
        InnovationLab: () => <img src={InnovationLabImg} alt="InnovationLab" />, 
        Discord: () => <img src={DiscordImg} alt="Discord" />, 
        Efrei: () => <img src={EfreiImg} alt="Efrei" />
    };

    return (
        <article className="event">
            <div className="event-img">
                { placeImg[place] }
            </div>

            <div className="event-info">
                <h4 className="event-info-title">{ eventName }</h4>
                <p className="event-info-description">{ description }</p>
                <div className="event-info-time">

                </div>
            </div>
        </article>
    );  
}

export default EventCard