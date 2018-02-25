const async = require('async');
const qtumCore = require('../modules/qtumCore');
const authorization = require('./lib/authorization');
const error = require('./lib/error');
const env = require('../modules/env');


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
			qtumCore.action('getinfo', !!req.headers.testnet, true, (result) => {
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
			qtumCore.action('getstakinginfo', !!req.headers.testnet, true, (result) => {
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
			qtumCore.action('getwalletinfo', !!req.headers.testnet, true, (result) => {
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
			qtumCore.action('-version', !!req.headers.testnet, false, (result) => {
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
		},
		layout: function(cb)
		{
			cb(null, env.get().LAYOUT);
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
				...result,
				status: 'error',
				...error.message(err),
			});
		}
	});
};