// TODO: .env 파일 만들기 스크립트

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
	fs.writeFile('.env', str, function(err) {
		if (err)
		{
			console.error(`Can not write file`);
			cb(false);
		}
		else
		{
			console.log(`Create 'template' file`);
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