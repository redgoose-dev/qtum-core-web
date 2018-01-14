/**
 * read `.env` file
 */

module.exports = function()
{
	let config = null;

	try
	{
		config = require('../../.env');
	}
	catch(e)
	{
		console.error(e);
		config = null;
	}

	return config;
};