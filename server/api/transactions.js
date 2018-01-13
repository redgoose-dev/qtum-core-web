const qtumCore = require('../qtumCore');


module.exports = function(req, res)
{
	qtumCore.action('listtransactions', (result) => {

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