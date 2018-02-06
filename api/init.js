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
			message: 'error authorization'
		});
		return;
	}

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
		wallet: function(cb)
		{
			qtumCore.action('getwalletinfo', true, (result) => {
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
		version: function(cb)
		{
			qtumCore.action('-version', false, (result) => {
				if (result.status === 'success' && !!result.data)
				{
					let regex = new RegExp(/version v\s*([\d.]+)-/, 'i');
					let match = regex.exec(result.data);
					cb(null, match[1]);
				}
				else
				{
					cb(result.message, null);
				}
			});
		}
	};

	async.parallel(tasks, function(err, result) {
		if (result && result.info && result.staking)
		{
			res.json(result);
		}
		else
		{
			res.json({
				status: 'error',
				...error.message(err),
			});
		}
	});
};