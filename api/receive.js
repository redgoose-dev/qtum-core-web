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

	switch (req.route.path)
	{
		case '/receive':
			qtumCore.action(`listreceivedbyaddress 0 true`, !!req.headers.testnet, true, (result) => {
				if (result.status === 'success' && !!result.data)
				{
					return res.json(result);
				}
				else
				{
					return res.json({
						status: 'error',
						...error.message(result.message),
					});
				}
			});
			break;

		case '/receive/add-address':
			qtumCore.action(
				`getnewaddress ${req.body.label ? `"${req.body.label}"` : ''}`,
				!!req.headers.testnet,
				false,
				function(result) {
					result.data = result.data.replace(/\n$/, '');
					return res.json({
						status: 'success',
						data: result.data,
					});
				}
			);
			break;

		default:
			return res.json({
				status: 'error',
				message: 'Service error',
			});
	}
};