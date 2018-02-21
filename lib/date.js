import * as util from './util';


/**
 * get format date
 * make `year-month-day hour:minutes:second`
 *
 * @param {Date} date
 * @param {Boolean} useTime
 */
export function getFormatDate(date=null, useTime=true)
{
	date = date || new Date();

	// set
	let month = '' + (date.getMonth() + 1);
	let day = '' + date.getDate();
	let year = date.getFullYear();
	let hour = date.getHours();
	let min = date.getMinutes();
	let sec = date.getSeconds();

	if (month.length < 2)
	{
		month = `0${month}`;
	}
	if (day.length < 2)
	{
		day = `0${day}`;
	}

	let result = `${year}-${month}-${day}`;
	if (useTime)
	{
		result += `${hour}:${min}:${sec}`;
	}

	return result;
}


export function unixToDate(stamp)
{
	return new Date(stamp * 1000);
}