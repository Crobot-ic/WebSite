import { Request, Response } from 'express'
import Events from '../../../Models/Events';
import generateDurationFromTs from '../../../Utils/genrateDurationFromTs';
import generateDateFromTs from '../../../Utils/generateDateFromTs';

const GetEvents = async (req: Request, res: Response) => {
    const allEvents = await Events.findAll({ 
        attributes: ["eventName", "description", "duration", "startDate", "place"]
    }), incomingEvents = new Array(), pastEvents = new Array(), now = Date.now();

    for (let i = 0; i < allEvents.length; i++) {
        const eventInfo = {
            eventName: allEvents[i].dataValues.eventName, 
            description: allEvents[i].dataValues.description, 
            duration: allEvents[i].dataValues.duration,
            startDate: allEvents[i].dataValues.startDate,
            place: allEvents[i].dataValues.place,
        }

        eventInfo.duration = generateDurationFromTs(eventInfo.duration);
        eventInfo.startDate = generateDateFromTs(eventInfo.startDate);

        if(allEvents[i].dataValues.startDate < now) pastEvents.push(eventInfo)
        else incomingEvents.push(eventInfo);
    }

    console.log({ incomingEvents, pastEvents });

    return res.status(200).json({ incomingEvents, pastEvents });
}

export default GetEvents;