const async = require('async');
const qtumCore = require('../modules/qtumCore');
const string = require('./lib/string');
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

	const params = string.urlToQueryObject(req.url);
	const tasks = {
		getnetworkinfo: function(cb)
		{
			qtumCore.action('getnetworkinfo', !!req.headers.testnet, true, (result) => {
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
		getblockchaininfo: function(cb)
		{
			qtumCore.action('getblockchaininfo', !!req.headers.testnet, true, (result) => {
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
		transactions: function(cb)
		{
			const start = 0;
			const size = params.count_recent || 8;
			qtumCore.action(`listtransactions "*" ${size} ${start}`, !!req.headers.testnet, true, (result) => {
				if (result.status === 'success' && !!result.data)
				{
					let arr = result.data;
					if (arr.length)
					{
						arr.reverse();
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
		if (!err)
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