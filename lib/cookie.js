/**
 * put cookie
 *
 * @param {String} cookie
 * @param {String} key
 * @return {String}
 */
export function get(cookie, key)
{
	let result = cookie.match(new RegExp(key + '=([^;]+)'));
	result = result ? result[1] : '';
	return String(result);
}


/**
 * set cookie
 *
 * @param {String} key
 * @param {String} value
 * @param {Number} day
 */
export function set(key=null, value='', day=0)
{
	try
	{
		if (!(document && key)) throw null;
		let expires = '';
		if (day > 0)
		{
			let date = new Date();
			date.setTime(date.getTime() + (day * 24 * 60 * 60 * 1000));
			expires = `expires=${date.toUTCString()};`;
		}
		document.cookie = `${key}=${value};${expires}path=/`;
		return true;
	}
	catch (e)
	{
		return false;
	}
}


export function remove(key)
{
	try
	{
		if (!(document && key)) throw null;
		document.cookie = `${key}=;Max-Age=-99999999;path=/`;
		return true;
	}
	catch (e)
	{
		return false;
	}
}