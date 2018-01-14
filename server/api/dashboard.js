const async = require('async');
const qtumCore = require('../qtumCore');


module.exports = function(req, res)
{
	const tasks = {
		info: function(cb)
		{
			qtumCore.action('getinfo', true, (result) => {
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
			qtumCore.action('getstakinginfo', true, (result) => {
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
			qtumCore.action('listtransactions', true, (result) => {
				if (result.status === 'success' && !!result.data)
				{
					let arr = result.data;
					if (arr.length)
					{
						arr.reverse();
						arr = arr.slice(0,5);
					}
					cb(null, arr);
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