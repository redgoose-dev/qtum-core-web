const qtumCore = require('../modules/qtumCore');
const env = require('../modules/env');
const authorization = require('./lib/authorization');


module.exports = function(req, res)
{
	const pref = require(`../${env.resource.file}`);

	// check authorization
	if (!authorization(req.headers))
	{
		return res.json({
			status: 'error',
			message: 'error authorization'
		});
	}

	// check hash
	if (!(req.body.hash && req.body.hash === pref.HASH))
	{
		return res.json({
			status: 'error',
			message: 'error hash'
		});
	}

	switch (req.route.path)
	{
		case '/core-power':

			console.log('offfff');
			// TODO: 코어 켜는것 시도중...
			return res.json({ foo: 'bar' });

			if (req.body.power)
			{
				// power on
				// qtumCore.power(true, !!req.headers.testnet, (result) => {
				// 	console.log('TODO: on qtum-core', result);
				// 	return res.json({ power: true, result });
				// });
			}
			else
			{
				// qtumCore.power(true, !!req.headers.testnet, (result) => {
				// 	console.log('TEST:::', result);
				// 	return res.json({ power: false, result });
				// });

				// power off
				// qtumCore.power(false, !!req.headers.testnet, (result) => {
				// 	// `Qtum server stopping`
				// 	console.log('TODO: off qtum-core', result);
				// 	return res.json({ power: false, result });
				// });
			}
	}
};