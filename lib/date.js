/**
 * get format date
 * make `year-month-day hour:minutes:second`
 *
 * @param {Date} date
 * @param {Boolean} useTime
 */
export function getFormatDate(date=null, useTime=true)
{
	function plusZero(n)
	{
		return (String(n).length < 2) ? `0${n}` : n;
	}

	date = date || new Date();

	// set
	let month = '' + (date.getMonth() + 1);
	let day = '' + date.getDate();
	let year = date.getFullYear();
	let hour = date.getHours();
	let min = date.getMinutes();
	let sec = date.getSeconds();

	let result = `${year}-${plusZero(month)}-${plusZero(day)}`;
	if (useTime)
	{
		result += ` ${plusZero(hour)}:${plusZero(min)}:${plusZero(sec)}`;
	}

	return result;
}


export function unixToDate(stamp)
{
	return new Date(stamp * 1000);
}