/**
 * create `.env` file
 */

const fs = require('fs');
const consoleColor = require('../consoleColor');


/**
 * read
 *
 * @param {Function} cb
 */
function read(cb)
{
	fs.readFile('./server/env/template', 'utf8', function(err, data) {
		if (data)
		{
			cb(data);
		}
		else
		{
			console.error(`Not found 'template' file`);
			cb(null);
		}
	});
}

/**
 * write
 *
 * @param {String} str
 * @param {Function} cb
 */
function write(str, cb)
{
	fs.writeFile('.env', str, function(err) {
		if (err)
		{
			console.log(consoleColor.red, `Can not write file`);
			cb(false);
		}
		else
		{
			console.log(consoleColor.green, `Create '.env' file`);
			cb(true);
		}
	});
}


module.exports = function(callback)
{
	read(function(data) {
		if (!data) callback(false);
		write(data, callback);
	});
};