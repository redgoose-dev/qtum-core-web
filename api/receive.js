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

	qtumCore.action(`listaddressgroupings`, !!req.headers.testnet, true, (result) => {
		if (result.status === 'success' && !!result.data)
		{
			let index = [];

			// convert index
			result.data.forEach((o, k) => {
				o.forEach((item) => {
					index.push({
						address: item[0],
						amount: item[1],
						label: item[2] || ''
					});
				});
			});

			res.json({
				status: 'success',
				data: {
					index,
				},
			});
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