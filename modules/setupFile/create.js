/**
 * create `.env.js` file
 */

const fs = require('fs');
const resource = require('./resource');


/**
 * read template
 *
 * @param {String} type
 * @return {Promise} cb
 */
function readTemplate(type='env')
{
	return new Promise(function(resolve) {
		let file = null;

		// set template file
		switch(type)
		{
			case 'env':
				file = './modules/env/template_env';
				break;
			case 'private':
				file = './modules/env/template_private';
				break;
			default:
				resolve({ status: 'error', message: 'Wrong type' });
				return;
		}

		fs.readFile('./modules/env/template', 'utf8', function(err, data) {
			if (data)
			{
				resolve({ status: 'success', data });
			}
			else
			{
				console.error(`Not found 'template' file`);
				resolve({ status: 'error', message: `Not found 'template' file` });
			}
		});
	});
}

/**
 * write
 *
 * @param {String} file
 * @param {String} str
 * @param {Function} cb
 */
function write(file, str, cb)
{
	fs.writeFile(file, str, cb);
}


/**
 * create env
 *
 * @param {String} type
 * @param {String} str 값이 없으면 새로 만든다.
 * @return {Promise}
 */
module.exports = function(type='', str)
{
	let file = null;

	switch(type)
	{
		case 'env':
			file = resource.file_env;
			break;
		case 'private':
			file = resource.file_private;
			break;
		default:
			file = null;
	}

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

		if (!file)
		{
			resolve({ error: true, message: 'Wrong type' });
			return;
		}

		if (str)
		{
			write(file, str, (err) => result(err, 'update'));
		}
		else
		{
			readTemplate(type).then(function(res) {
				if (res.status === 'error')
				{
					resolve({
						error: true,
						message: 'Not found template file.',
					});
					return;
				}
				write(file, data, (err) => result(err, 'make'));
			});
		}
	});
};
