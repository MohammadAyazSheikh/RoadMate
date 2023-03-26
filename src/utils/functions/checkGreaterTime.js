import moment from "moment";

export const checkDate = (date1, date2) => {
    const A = moment(date1).format('YYYY-MM-DD');
    const B = moment(date2).format('YYYY-MM-DD');
    const isGreater = moment(A).isBefore(B);
    return isGreater;
};

export const isTimeBefore = (time1, time2) => {
    // console.log(moment(time1))
    const A = moment(time1, 'HH:mm')//.format('hh:mm');
    const B = moment(time2, 'HH:mm')//.format('hh:mm');

    return moment(A).isBefore(B) ;
};


export const isTimeSame = (time1, time2) => {

    const A = moment(time1, 'HH:mm');
    const B = moment(time2, 'HH:mm');

    return moment(A).isSame(B);
};

