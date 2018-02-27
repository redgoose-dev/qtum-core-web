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
		if (!env.APPLICATION) throw '';
		if (!headers.authorization) throw '';
		if (env.APPLICATION !== headers.authorization) throw '';
		return true;
	}
	catch(e)
	{
		return false;
	}
};