const setupFile = require('../../modules/setupFile');


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
		const config = setupFile.get('all');
		if (!config.env.APPLICATION) throw '';
		if (!headers.authorization) throw '';
		if (config.env.APPLICATION !== headers.authorization) throw '';
		return true;
	}
	catch(e)
	{
		return false;
	}
};