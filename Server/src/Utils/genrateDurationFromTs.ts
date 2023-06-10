const generateDurationFromTs: (ts: number) => string = (ts: number): string => {
    const dayTs = 86_400_000, hourTs = 3_600_000, minuteTs = 60_000;
    const numberDays = Math.floor(ts / dayTs);
    const numberHours = Math.floor((ts % dayTs) / hourTs);
    const numberMinutes = Math.floor((ts % hourTs) / minuteTs);

    if(numberDays == 0) return numberHours.toString().padStart(2, "0") + ":" + numberMinutes.toString().padStart(2, "0");
    else return numberDays + "j, " + numberHours.toString().padStart(2, "0") + ":" + numberMinutes.toString().padStart(2, "0");
}

export default generateDurationFromTs;