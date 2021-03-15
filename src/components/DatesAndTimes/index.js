const setFormat = (date) => {
    let day = 0;
    const dayNo = date.getDate() - 1;
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
export const yesterday = setFormat(date);

const dayBeforeDate = new Date(date.setDate(date.getDate() - 1));
export const dayBefore = setFormat(dayBeforeDate);
// console.log(dayBefore);

const oneWeekAgoDate = new Date(date.setDate(date.getDate() - 6));
export const oneWeekAgo = setFormat(oneWeekAgoDate);
// console.log(oneWeekAgo);

date.setDate(date.getDate() + 7);

const oneMonthAgoDate = new Date(date.setMonth(date.getMonth() - 1));
export const oneMonthAgo = setFormat(oneMonthAgoDate);
// console.log(oneMonthAgo);

const threeMonthsAgoDate = new Date(date.setMonth(date.getMonth() - 2));
export const threeMonthsAgo = setFormat(threeMonthsAgoDate);
// console.log(threeMonthsAgo);

const oneYearAgoDate = new Date(date.setMonth(date.getMonth() - 9));
export const oneYearAgo = setFormat(oneYearAgoDate);
// console.log(oneYearAgo);

const fiveYearsAgoDate = new Date(date.setMonth(date.getMonth() - 48));
export const fiveYearsAgo = setFormat(fiveYearsAgoDate);
// console.log(fiveYearsAgo);

export const getDate = (timestamp) => {
    let date = new Date(timestamp);
    return date.toLocaleString();
}