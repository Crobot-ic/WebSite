const getDateTsForEvent: (event: string) => false | number = (event: string): false | number => {
    const eventDateDetails = event.split("/");
    if(eventDateDetails.length != 3) return false;
    eventDateDetails[0] = eventDateDetails[0].padStart(2, "0");
    eventDateDetails[1] = eventDateDetails[1].padStart(2, "0");
    eventDateDetails[2] = eventDateDetails[2].padStart(2, "0");

    const eventDateString = eventDateDetails[2] + "-" + eventDateDetails[1] + "-" + eventDateDetails[0] + "T00:00:00";
    const dateTs = new Date(eventDateString) as Date | string;
    if(dateTs == 'Invalid Date') return false;
    
    return (dateTs as Date).getTime();
}

export default getDateTsForEvent;