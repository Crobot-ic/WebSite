import "../../styles/css/index.css";
import InnovationLabImg from "../../assets/InnovationLab.png";
import EfreiImg from "../../assets/Efrei.png";
import DiscordImg from "../../assets/Discord.png";

const EventCard = (props) => {
    const { place, startTime, duration, description, eventName } = props;

    console.log(duration);

    const placeImg = {
        InnovationLab: <img src={InnovationLabImg} alt="InnovationLab" />, 
        Discord: <img src={DiscordImg} alt="Discord" />, 
        Efrei: <img src={EfreiImg} alt="Efrei" />
    };

    return (
        <article className="event">
            <div className="event-picture">
                { placeImg[place] }
            </div>

            <div className="event-info">
                <h4 className="event-info-title">{ eventName }</h4>
                <p className="event-info-description">{ description }</p>
                <div className="event-info-time">
                    <div className="event-info-time-start">
                        <h6>Commence à : </h6>
                        <p>{ startTime }</p>
                    </div>
                    <div className="event-info-time-duration">
                        <h6>Durée : </h6>
                        <p>{ duration }</p>
                    </div>
                </div>
            </div>
        </article>
    );  
}

export default EventCard