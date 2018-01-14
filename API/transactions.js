const qtumCore = require('../modules/qtumCore');


module.exports = function(req, res)
{
	qtumCore.action('listtransactions', true, (result) => {

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