/**
 * read `.env` file
 */

module.exports = function()
{
	let env = null;
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