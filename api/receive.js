const async = require('async');
const qtumCore = require('../modules/qtumCore');
const authorization = require('./lib/authorization');
const error = require('./lib/error');


module.exports = function(req, res)
{
	if (!authorization(req.headers))
	{
		res.json({
			status: 'error',
			message: 'Error authorization'
		});
		return;
	}

	qtumCore.action(`listreceivedbyaddress`, !!req.headers.testnet, true, (result) => {
		if (result.status === 'success' && !!result.data)
		{
			res.json(result);
		}
		else
		{
			res.json({
				status: 'error',
				...error.message(result.message),
			});
		}
	});
};