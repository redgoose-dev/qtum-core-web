/**
 * create `.env` file
 */

const fs = require('fs');


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
	if (fs.existsSync('.env'))
	{
		cb(false, `Exist '.env' file.`);
		return;
	}

	fs.writeFile('.env', str, function(err) {
		if (err)
		{
			cb(false, `Can't write '.env' file.`);
		}
		else
		{
			cb(true, `Success create '.env' file.`);
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