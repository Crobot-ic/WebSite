const generateDateFromTs: (ts: number) => string = (ts: number): string => {
    const date = new Date(ts);
    const dateString = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    return dateString;
}

export default generateDateFromTs;