//get a calendar date by adding or subtracting the specified count of days from current date 
const getCustomCalendarDate = (count) => {
    const date = new Date();
    date.setDate(date.getDate() + count);
	let customCalendarDate = date.toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
 
    return customCalendarDate
}

export default getCustomCalendarDate;