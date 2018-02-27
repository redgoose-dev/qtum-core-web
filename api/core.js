const qtumCore = require('../modules/qtumCore');
const env = require('../modules/env');
const authorization = require('./lib/authorization');


module.exports = function(req, res)
{
	const pref = require(`../${env.resource.file}`);
	let cmd = null;

	// check authorization
	if (!authorization(req.headers))
	{
		return res.json({
			status: 'error',
			message: 'error authorization'
		});
	}

	// check hash
	let hash = !!req.headers.testnet ? pref.HASH_TESTNET : pref.HASH_MAINNET;
	if (!(req.body.hash && req.body.hash === hash))
	{
		return res.json({
			status: 'error',
			message: 'error hash'
		});
	}

	switch (req.route.path)
	{
		case '/core-power':
			if (req.body.power)
			{
				// power on
				qtumCore.power(true, !!req.headers.testnet, (result) => {
					return res.json(result);
				});
			}
			else
			{
				// power off
				qtumCore.power(false, !!req.headers.testnet, (response) => {
					if (response.status === 'success' && !!response.data)
					{
						if (response.data.search('stopping') > -1)
						{
							return res.json({ status: 'success' });
						}
						else
						{
							return res.json({ status: 'error' });
						}
					}
					else
					{
						return res.json({ status: 'error' });
					}
				});
			}
			break;

		case '/core-unlock':
			cmd = `walletpassphrase "${req.body.password}" 9999999999 ${req.body.staking}`;
			qtumCore.action(cmd, !!req.headers.testnet, false, (result) => {
				return res.json(result);
			});
			break;

		case '/core-lock':
			cmd = `walletlock`;
			qtumCore.action(`walletlock`, !!req.headers.testnet, false, (result) => {
				return res.json(result);
			});
			break;

		case '/core-change-testnet':
			if (req.session.auth)
			{
				req.session.auth.testnet = req.body.testnet ? 1 : 0;
				return res.json({ status: 'success' });
			}
			else
			{
				return res.json({ status: 'error' });
			}
	}
};