const password = require('../modules/password');
const env = require('../modules/env');
const authorization = require('./lib/authorization');

const hour = 3600000;
const rememberDay = 7;


module.exports = function(req, res)
{
	if (!authorization(req.headers))
	{
		return res.json({
			status: 'error',
			message: 'Error authorization'
		});
	}

	const pref = require(`../${env.resource.file}`);

	switch (req.route.path)
	{
		case '/login':
			const confirm = password.compare(req.body.password, pref.HASH);

			if (confirm)
			{
				if (req.body.remember)
				{
					req.session.cookie.maxAge = hour * 24 * rememberDay;
				}
				else
				{
					req.session.cookie.expires = false;
				}

				// write hash
				req.session.auth = { hash: pref.HASH };

				return res.json({
					status: 'success',
					data: { hash: pref.HASH },
				});
			}
			else
			{
				return res.json({ status: 'error' });
			}

		case '/logout':
			if (req.body.hash !== pref.HASH)
			{
				return res.json({ status: 'error' });
			}

			// remove session
			delete req.session.auth;

			// print result
			return res.json({ status: 'success' });

		default:
			return res.json({ status: 'error' });
	}
};