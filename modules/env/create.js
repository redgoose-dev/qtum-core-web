/**
 * create `.env.js` file
 */

const fs = require('fs');
const resource = require('./resource');


/**
 * read template
 *
 * @param {Function} cb
 */
function readTemplate(cb)
{
	fs.readFile('./modules/env/template', 'utf8', function(err, data) {
		if (data)
		{
			cb(false, data);
		}
		else
		{
			console.error(`Not found 'template' file`);
			cb(true);
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
	fs.writeFile(resource.file, str, cb);
}


/**
 * create env
 *
 * @param {String} str
 * @param {Function} callback
 */
module.exports = function(str, callback)
{
	function result(err, type='create')
	{
		if (err)
		{
			callback(true, `Can't ${type} '${resource.file}' file.`);
		}
		else
		{
			callback(false, `Success ${type} '${resource.file}' file.`);
		}
	}

	if (str)
	{
		write(str, (err) => result(err, 'update'));
	}
	else
	{
		readTemplate(function(err, data) {
			if (err) callback(false, 'Not found template file.');
			write(data, (err) => result(err, 'make'));
		});
	}
};
