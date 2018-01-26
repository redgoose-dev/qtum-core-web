const async = require('async');
const qtumCore = require('../modules/qtumCore');


// function treeToList(src)
// {
// 	let index = [];
// 	Object.keys(src).forEach(function (o, k) {
// 		let item = src[o];
// 		item.forEach(function(key) {
// 			index.push(key);
// 		});
// 	});
// 	return index;
// }


module.exports = function(req, res)
{
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
			//if (!o) o = 'none';
			tasks[o] = function(cb) {
				// get address
				qtumCore.action(`getaddressesbyaccount "${o}"`, true, (result) => {
					if (!(result.status === 'success' && result.data))
					{
						cb(true, null);
						return;
					}

					// TODO: 부모 자식 트리로 이루어져 있는데 어카운트는 동일한 이름에서 묶여있다.
					// TODO: { name: "key", data: [addresses] }
					console.log(o, result.data);

					// result.data.forEach((address, k) => {
					// 	console.log(address);
					// });
					// console.log('--------[');

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
				res.json({
					status: 'success',
				});

				// if (err)
				// {
				// 	res.json({
				// 		status: 'error',
				// 		message: 'error API'
				// 	});
				// }
				// else
				// {
				// 	console.log(result);
				// 	res.json({
				// 		status: 'success',
				// 		data: result
				// 	});
				// }
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