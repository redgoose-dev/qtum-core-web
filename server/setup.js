const env = require('./env');
const consoleColor = require('./consoleColor');


// create `.env` file
env.create(function(result, message) {
	if (result)
	{
		console.log(consoleColor.green, message, '\x1b[0m', consoleColor.reset);
	}
	else
	{
		console.error(message);
	}
});