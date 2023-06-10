const getDateTsForEvent: (event: string, mode: string | undefined) => false | number = (event: string, mode: string | undefined): false | number => {
    mode = mode ?? "Project"
    if(mode == "Project") {
        const eventDateDetails = event.split("/");
        if(eventDateDetails.length != 3) return false;
        eventDateDetails[0] = eventDateDetails[0].padStart(2, "0");
        eventDateDetails[1] = eventDateDetails[1].padStart(2, "0");
        eventDateDetails[2] = eventDateDetails[2].padStart(2, "0");

        const eventDateString = eventDateDetails[2] + "-" + eventDateDetails[1] + "-" + eventDateDetails[0] + "T00:00:00";
        const dateTs = new Date(eventDateString) as Date | string;
        if(dateTs == 'Invalid Date') return false;

        return (dateTs as Date).getTime();    
    } else if (mode == "Event") {
        const splitHourDate = event.split(" ");
        const eventDateDetails = splitHourDate[0].split("/");
        const eventHourDetails = splitHourDate[1].split(":");

        if(eventDateDetails.length != 3) return false;
        eventDateDetails[0] = eventDateDetails[0].padStart(2, "0");
        eventDateDetails[1] = eventDateDetails[1].padStart(2, "0");
        eventDateDetails[2] = eventDateDetails[2].padStart(2, "0");

        eventHourDetails[0] = eventHourDetails[0].padStart(2, "0");
        eventHourDetails[1] = eventHourDetails[1].padStart(2, "0");

        const eventDateString = eventDateDetails[2] + "-" + eventDateDetails[1] + "-" + eventDateDetails[0] + "T" + eventHourDetails[0] + ":" + eventHourDetails[1] + ":00";
        const dateTs = new Date(eventDateString) as Date | string;
        if(dateTs == 'Invalid Date') return false;

        return (dateTs as Date).getTime();    
    }   

    return false;
}

export default getDateTsForEvent;