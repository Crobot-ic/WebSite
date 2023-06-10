const generateDateFromTs: (ts: number) => string = (ts: number): string => {
    const date = new Date(parseInt(ts.toString()));
    
    const dateString = 
        date.getDate().toString().padStart(2, "0") + "/" + 
        (date.getMonth() + 1).toString().padStart(2, "0") + "/" + 
        date.getFullYear().toString().padStart(2, "0") + " " +
        date.getHours().toString().padStart(2, "0") + ":" + 
        date.getMinutes().toString().padStart(2, "0");
    return dateString;
}

export default generateDateFromTs;