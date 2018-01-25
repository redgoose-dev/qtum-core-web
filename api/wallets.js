const qtumCore = require('../modules/qtumCore');
const string = require('./lib/string');


module.exports = function(req, res)
{
	qtumCore.action(`listaccounts`, true, (result) => {
		if (result.status === 'success' && !!result.data)
		{

		}
		else
		{
			res.json({
				status: 'error',
				message: result.message
			});
		}

		//res.json(result);
	});
};