/**
 * get cookie
 *
 * @param {Object} req
 * @param {String} key
 * @return {String}
 */
exports.get = function(req, key)
{
	let result = req.headers.cookie.match(new RegExp(key + '=([^;]+)'));
	result = result ? result[1] : '';
	return String(result);
};


/**
 * set cookie
 *
 * @param {Object} res
 * @param {String} key
 * @param {String} value
 * @param {Number} day
 */
exports.set = function(res, key, value, day=0)
{
	if (!(key && value)) return;
	res.cookie(
		key,
		value,
		{
			...(day && { maxAge: day * 24 * 60 * 60 * 1000 }),
			httpOnly: true,
		}
	);
};


/**
 * remove cookie
 *
 * @param {Object} res
 * @param {String} key
 */
exports.remove = function(res, key)
{
	if (!key) return;
	res.cookie( key, '', { maxAge: -999999, httpOnly: true });
};