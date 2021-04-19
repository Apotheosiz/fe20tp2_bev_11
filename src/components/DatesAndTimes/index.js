import subBusinessDays from 'date-fns/subBusinessDays';

export const getDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.toLocaleString("en", { day: "numeric" });
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const time = date.toISOString().split("T")[1].slice(0,5);
    return day + " " + month + " " + year + " " + time
}

const setFormat = (date) => {
    let day = 0;
    let dayNo = date.getDate();

    if (dayNo < 10) {
        day = "0" + dayNo;
    } else day = dayNo;

    let month = 0;
    const monthNo = date.getMonth();
    if (monthNo < 10) {
        month = "0" + (monthNo + 1);
    } else month = monthNo + 1;

    const year = date.getFullYear();
    return year + "-" + month + "-" + day;
}

 const date = new Date();

const goBack = (date, days) => {
    const result = subBusinessDays(date, days);
    return new Date(result);
};

export const today = setFormat(date);

export const yesterday = setFormat(goBack(new Date(), 1))

const oneWeekAgoDate = new Date(date.setDate(date.getDate() - 7));
export const oneWeekAgo = setFormat(oneWeekAgoDate);

date.setDate(date.getDate() + 7);

const oneMonthAgoDate = new Date(date.setMonth(date.getMonth() - 1));
export const oneMonthAgo = setFormat(oneMonthAgoDate);


const threeMonthsAgoDate = new Date(date.setMonth(date.getMonth() - 2));
export const threeMonthsAgo = setFormat(threeMonthsAgoDate);


const oneYearAgoDate = new Date(date.setMonth(date.getMonth() - 9));
export const oneYearAgo = setFormat(oneYearAgoDate);


const fiveYearsAgoDate = new Date(date.setMonth(date.getMonth() - 12));
export const fiveYearsAgo = setFormat(fiveYearsAgoDate);


