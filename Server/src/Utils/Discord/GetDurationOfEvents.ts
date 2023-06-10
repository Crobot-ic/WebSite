const getDurationOfEvents: (duration: string) => false | number = (duration: string): false | number => {
    const durationDetails = duration.split(":");
    if(durationDetails.length != 3) return false;
    const dayDuration = parseInt(durationDetails[0]);
    const hourDuration = parseInt(durationDetails[1]);
    const minuteDuration = parseInt(durationDetails[2]);

    const dayTs = 86_400_000, hourTs = 3_600_000, minuteTs = 60_000;

    if(Number.isNaN(dayDuration) || dayDuration < 0 ||  Number.isNaN(hourDuration) || hourDuration < 0 || Number.isNaN(minuteDuration) || minuteDuration < 0) 
        return false;
    
    return (dayDuration * dayTs) + (hourDuration * hourTs) + (minuteDuration * minuteTs);
}

export default getDurationOfEvents;