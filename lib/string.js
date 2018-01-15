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