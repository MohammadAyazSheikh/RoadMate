import moment from 'moment'


// const offerDate = moment("2022-08-19", "YYYY-MM-DD");

// Convert to milisecond
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

export default countDown = (setTime,offerDate, intervalId) => {
    const today = moment();
    const timeSpan = offerDate.diff(today);

    if (timeSpan <= -today) {
        console.log("Unfortunately we have past the event day");
        clearInterval(intervalId);
        return false;
    } else if (timeSpan <= 0) {
        console.log("Today is the event day");
        clearInterval(intervalId);
        return false;
    } else {
        const days = Math.floor(timeSpan / day) ;
        const hours = Math.floor((timeSpan % day) / hour);
        const minutes = Math.floor((timeSpan % hour) / minute);
        const seconds = Math.floor((timeSpan % minute) / second);


        const time = `${days}d : ${hours}h : ${minutes}m : ${seconds}s`;
        setTime(time);
        
        return time;
    }
};

// interval = setInterval(countDownFn, second);