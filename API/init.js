const async = require('async');
const qtumCore = require('../modules/qtumCore');


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
		stakinginfo: function(cb)
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
		}
	};

	async.parallel(tasks, function(err, result) {
		if (result && result.info && result.stakinginfo)
		{
			res.json(result);
		}
		else
		{
			res.json({
				status: 'error',
				message: 'error API'
			});
		}
	});
};