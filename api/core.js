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
			if (req.body.power)
			{
				// power on
				qtumCore.power(true, !!req.headers.testnet, (result) => {
					// TODO: 명령을 내렸다고 바로 켜지지 않는것을 확인했다.
					// TODO: `getinfo`명령을 지속적으로 날려서 값이 나오면 켜졌다고 확신을 할 수 있을때 `res.json()`을 출력하는것을 시도해봐야겠다.
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
	}
};