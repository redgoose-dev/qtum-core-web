const qtumCore = require('../modules/qtumCore');
const string = require('./lib/string');


module.exports = function(req, res)
{
	const params = string.urlToQueryObject(req.url);
	let size = params.size || 10;
	let start = size * (params.page ? params.page - 1 : 0);

	qtumCore.action(`listtransactions "*" ${size} ${start}`, true, (result) => {
		if (result.status === 'success' && !!result.data)
		{
			if (result.data.length)
			{
				result.data.reverse();
			}
			res.json(result);
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