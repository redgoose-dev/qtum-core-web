const async = require('async');
const qtumCore = require('../modules/qtumCore');
const authorization = require('./lib/authorization');


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

	/**
	 * make tasks
	 *
	 * @param {Array} keys
	 * @return {Object}
	 */
	function makeTasks(keys=[])
	{
		let tasks = {};
		keys.forEach((o, k) => {
			tasks[o] = function(cb) {
				// get address
				qtumCore.action(`getaddressesbyaccount "${o}"`, true, (result) => {
					if (!(result.status === 'success' && result.data))
					{
						cb(true, null);
						return;
					}
					cb(null, result.data);
				});
			};
		});
		return tasks;
	}

	qtumCore.action(`listaccounts`, true, (result) => {
		if (result.status === 'success' && !!result.data)
		{
			let tasks = makeTasks(Object.keys(result.data));
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
					res.json({
						status: 'success',
						data: result
					});
				}
			});
		}
		else
		{
			res.json({
				status: 'error',
				message: result.message
			});
		}
	});
};