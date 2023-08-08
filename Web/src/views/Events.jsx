import { useEffect, useState } from 'react';
import informations from "../../informations.json";
import '../styles/css/index.css';

const Events = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            const eventsSent = await (await fetch(informations.urlApi + "/events/")).json();
            setEvents(eventsSent);
        }

        getEvents();
    }, []);

    return (
        <></>
    );
}

export default Events;