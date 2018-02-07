/**
 * Get parameter by name
 *
 * @param {String} name
 * @param {String} url
 * @return {String}
 */
export function getParameterByName(name, url)
{
	if (!url) return null;
	name = name.replace(/[\[\]]/g, "\\$&");
	let regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
	let results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}


/**
 * Get lock information
 *
 * @param {Number} unlocked_until
 * @return {String}
 */
export function getLockInformation(unlocked_until=null)
{
	if (unlocked_until === 0)
	{
		return 'encrypted'; // 잠겨있음
	}
	else if (unlocked_until > 0)
	{
		return 'unLock'; // 잠김해제되어있음
	}
	else
	{
		return 'notEncrypted'; // 잠금설정되어있지 않음
	}
}