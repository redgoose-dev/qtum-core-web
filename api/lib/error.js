/**
 * get message
 *
 * @param {Error} err
 * @return {Object}
 */
exports.message = function(err)
{
	if (!err) return {
		code: 500,
		message: 'Error server api',
	};

	let str = err.toString();

	if (str.search(`couldn't connect to server`))
	{
		return {
			code: 600,
			message: 'qtum-core is turned off.'
		};
	}

	return {
		code: 500,
		message: err
	};
};