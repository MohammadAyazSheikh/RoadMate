
const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);






function isOverlap(time1, time2) {
    const range1 = moment.range(time1);
    const range2 = moment.range(time2);

    if (range1.overlaps(range2)) {
        // if ((range2.contains(range, true) || range.contains(range2, true)) && !date1[0].isSame(date2[0]))
        //     console.log("time range 1 is completely conflict with time range 2 and vice versa");
        // else
        //     console.log("time range 1 is partially conflict with time range 2 and vice versa");
        return true;
    }
    else {
        return false;
    }
}



export function getAvailableTime(bookedHours, shopTime) {

    //getting total shop opening hours
    var duration = moment.duration(shopTime?.end?.diff && shopTime?.end?.diff(shopTime.start));
    var hours = duration.asHours();

    const timeArr = []
    const hourLen = hours;
    const minutLen = 4;
    //shop opening time
    let timeStart = shopTime.start;

    for (let h = 0; h < hourLen; h++) {
        let minuts = 0;

        for (let m = 0; m < minutLen; m++) {

            minuts = minuts + 15;
            minuts = minuts == 60 ? '00' : minuts;

            let time_ = timeStart.format('hh:mm a');;
            const isTimeBooked = bookedHours && bookedHours?.some(item => {

                return moment(time_, 'HH:mm, a').isBetween(item.start, item.end)
                    || moment(time_, 'HH:mm, a').isSame(item.start)
                    || moment(time_, 'HH:mm, a').isSame(item.end)
            })


            if (!isTimeBooked) {
                timeArr.push(time_)
            }


            time_ = timeStart.add(15, 'minutes')

        }
    }
    return timeArr;
}



export const roundMinutes = (m) => {

    m = parseInt(m);

    if (m == 0) {
        return m;
    }
    else if (m > 0 && m <= 15) {
        return (15 - m);
    }
    else if (m > 15 && m <= 30) {
        return (30 - m);
    }
    else if (m > 30 && m <= 45) {
        return (45 - m);
    }
    else if (m > 45 && m <= 59) {
        return 60 - m;
    }
}


export const getTime = () => {
    // const  = moment().format('a')
    const timeArr = []
    const hourLen = 12;
    const minutLen = 4;
    for (let h = 0; h < hourLen; h++) {
        let minuts = 0;

        for (let m = 0; m < minutLen; m++) {
            // console.log(h + 1, minuts)
            minuts = minuts + 15;
            minuts = minuts == 60 ? '00' : minuts;
            timeArr.push(`${h + 1}:${minuts} PM`)
        }
    }
    return timeArr;
}


export const checkIsTimeAvailable = (timeStart, timeEnd, availableTimeSlotArr) => {


    if (timeStart && timeEnd && availableTimeSlotArr) {

        const timeArr = []

        let addMinutes = 15;
        while (moment(timeStart, "hh:mm a").add(addMinutes, "minutes").format("hh:mm a").toString() != timeEnd) {
            timeArr.push(moment(timeStart, "hh:mm a").add(addMinutes, "minutes").format("hh:mm a"));
            addMinutes += 15;
        }

        timeArr.push(timeEnd);

        const isTimeAvailable = timeArr.every(selectedBookingTimeSlot => {
            return availableTimeSlotArr.some(availableTimeSlot => selectedBookingTimeSlot == availableTimeSlot)
        });



        console.log("=====> selected", timeArr);
        console.log("=====> available", availableTimeSlotArr)

        return isTimeAvailable;
    }
    else {
        return false;
    }


}