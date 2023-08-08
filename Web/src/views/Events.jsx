import { useEffect, useState } from 'react';
import informations from "../../informations.json";
import '../styles/css/index.css';
import EventCard from '../components/Events/EventCard';

const Events = () => {
    const [events, setEvents] = useState({ incomingEvents: [], pastEvents: [] });

    useEffect(() => {
        const getEvents = async () => {
            const eventsSent = await (await fetch(informations.urlApi + "/events/")).json();
            setEvents(eventsSent);
        }

        getEvents();
    }, []);

    return (
        <>
            <section className="events">
                {events.incomingEvents.length != 0 && (
                    <div className="events-container events-incoming">
                        <h2 className="events-title">
                            Événements à venir &nbsp;
                            <span>({ events.incomingEvents.length })</span>
                        </h2>

                        <div className="events-list events-incoming-list">
                            {events.incomingEvents.map((event, index) => {
                                <EventCard 
                                    key = { index }
                                    place = { event.place}
                                    startTime = { event.startDate }
                                    duration = { event.Duration }
                                    description = { event.description }
                                    eventName = { event.eventName }
                                />
                            })}
                        </div>
                    </div>
                )}

                {events.pastEvents.length != 0 && (
                    <div className="events-container events-past">
                        <h2 className="events-title">
                            Nos derniers événements &nbsp;
                            <span>({ events.pastEvents.length })</span>
                        </h2>

                        <div className="events-list events-incoming-list">
                            {events.pastEvents.map((event, index) => {
                                <EventCard 
                                    key = { index }
                                    place = { event.place}
                                    startTime = { event.startDate }
                                    duration = { event.Duration }
                                    description = { event.description }
                                    eventName = { event.eventName }
                                />
                            })}
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}

export default Events;