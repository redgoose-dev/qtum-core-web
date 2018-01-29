const password = require('../modules/password');
const cookie = require('./lib/cookie');
const env = require('../modules/env');


module.exports = function(req, res)
{
	const pref = require(`../${env.resource.file}`);
	let body = '';

	/**
	 * login
	 *
	 * @param {Object} data
	 */
	function login(data)
	{
		const confirm = password.compare(data.password, pref.HASH);

		if (confirm)
		{
			// write cookie
			cookie.set(res, 'hash', pref.HASH, data.remember ? 7 : null);
		}

		// print result
		res.json({
			status: 'success',
			data: {
				is_login: confirm ? 1 : 0,
				hash: pref.HASH,
			}
		});
	}

	/**
	 * logout
	 *
	 * @param {Object} data
	 */
	function logout(data)
	{
		if (data.hash !== pref.HASH)
		{
			res.json({
				status: 'error',
				message: 'Invalid hash value.',
			});
			return;
		}

		// remove cookie
		cookie.remove(res, 'hash');

		// print result
		res.json({ status: 'success' });
	}

	switch (req.route.path)
	{
		case '/login':
			body = '';
			req.on('data', function(chunk) { body += chunk; });
			req.on('end', () => login(JSON.parse(body)));
			break;

		case '/logout':
			body = '';
			req.on('data', function(chunk) { body += chunk; });
			req.on('end', () => logout(JSON.parse(body)));
			break;

		default:
			res.json({ status: 'error' });
			break;
	}
};