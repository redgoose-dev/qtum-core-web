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
 * @param {String} str 값이 없으면 새로 만든다.
 * @return {Promise}
 */
module.exports = function(str)
{
	return new Promise(function(resolve) {
		function result(err, type='create')
		{
			if (err)
			{
				resolve({
					error: true,
					message: `Can't ${type} '${resource.file}' file.`,
				});
			}
			else
			{
				resolve({
					error: false,
					message: `Success ${type} '${resource.file}' file.`,
				});
			}
		}

		if (str)
		{
			write(str, (err) => result(err, 'update'));
		}
		else
		{
			readTemplate(function(err, data) {
				if (err)
				{
					resolve({
						error: false,
						message: 'Not found template file.',
					});
					return;
				}
				write(data, (err) => result(err, 'make'));
			});
		}
	});
};
