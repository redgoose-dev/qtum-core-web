const qtumCore = require('../qtumCore');


module.exports = function(req, res)
{
	qtumCore.action('listtransactions', (result) => {

		if (result.status === 'success' && !!result.data)
		{
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