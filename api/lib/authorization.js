/**
 * check authorization
 *
 * @param {Object} headers
 * @return {Boolean}
 */
module.exports = function(headers)
{
	try
	{
		const env = require('../../.env');
		if (!env.TOKEN) throw '';
		if (!headers.authorization) throw '';
		if (env.TOKEN !== headers.authorization) throw '';
		return true;
	}
	catch(e)
	{
		return false;
	}
};