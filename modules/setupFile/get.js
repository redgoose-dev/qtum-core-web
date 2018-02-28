/**
 * read `.env` file
 */

const resource = require('./resource');


module.exports = function()
{
	let config = null;

	try
	{
		config = require(`../../${resource.file}`);
	}
	catch(e)
	{
		console.error(e);
		config = null;
	}

	return config;
};