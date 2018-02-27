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

	// set env
	const pref = require(`../${env.resource.file}`);
	// set hash (testnet or mainnet)
	const hash = req.body.testnet ? pref.HASH_TESTNET : pref.HASH_MAINNET;

	switch (req.route.path)
	{
		// login
		case '/login':
			const confirm = password.compare(req.body.password, hash);

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
				req.session.auth = {
					hash,
					testnet: req.body.testnet,
				};

				return res.json({
					status: 'success',
					data: {
						hash,
						testnet: req.body.testnet,
					},
				});
			}
			else
			{
				return res.json({ status: 'error' });
			}

		// logout
		case '/logout':
			if (req.body.hash !== hash)
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