const async = require('async');
const qtumCore = require('../qtumCore');


module.exports = function(req, res)
{
	const tasks = {
		info: function(cb)
		{
			qtumCore.action('getinfo', (result) => {
				if (result.status === 'success' && !!result.data)
				{
					cb(null, result.data);
				}
				else
				{
					cb(result.message, null);
				}
			});
		},
		staking: function(cb)
		{
			qtumCore.action('getstakinginfo', (result) => {
				if (result.status === 'success' && !!result.data)
				{
					cb(null, result.data);
				}
				else
				{
					cb(result.message, null);
				}
			});
		},
		transactions: function(cb)
		{
			qtumCore.action('listtransactions', (result) => {
				if (result.status === 'success' && !!result.data)
				{
					cb(null, result.data);
				}
				else
				{
					cb(result.message, null);
				}
			});
		}
	};

	async.parallel(tasks, function(err, result) {
		if (err)
		{
			res.json({
				status: 'error',
				message: 'error API'
			});
		}
		else
		{
			res.json(result);
		}
	});
};