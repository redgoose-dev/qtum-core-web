const authorization = require('./lib/authorization');
const setupFile = require('../modules/setupFile');


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

	let result = setupFile.get('env');
	return res.json(result);
};