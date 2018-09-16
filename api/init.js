const async = require('async');
const qtumCore = require('../modules/qtumCore');
const authorization = require('./lib/authorization');
const error = require('./lib/error');
const setupFile = require('../modules/setupFile');


/**
 * initialize
 *
 * @formdata {String} req.body.hash
 */

module.exports = function(req, res)
{
	// check header
	if (!authorization(req.headers))
	{
		res.json({
			status: 'error',
			message: 'error authorization'
		});
		return;
	}

	// task
	const tasks = {
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
		version: function(cb)
		{
			qtumCore.action('-version', !!req.headers.testnet, false, (result) => {
				if (result.status === 'success' && !!result.data)
				{
					try
					{
						let regex = new RegExp(/ion v\s*([\d.]+)/, 'i');
						let match = regex.exec(result.data);
						if (!(match && match[1])) throw '';
						cb(null, match[1]);
					}
					catch(e)
					{
						cb(null, null);
					}
				}
				else
				{
					cb(result.message, null);
				}
			});
		}
	};

	async.parallel(tasks, function(err, result) {
		// check hash
		const config = setupFile.get('private');
		const hash = req.headers.testnet ? config.HASH_TESTNET : config.HASH_MAINNET;
		if (hash !== req.body.hash)
		{
			return res.json({
				...result,
				status: 'error',
				code: 403,
				message: 'Access denied',
			});
		}

		if (result && result.wallet && result.staking)
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