const fs = require('fs');
const env = require('../modules/env');


module.exports = function(req, res)
{
	try
	{
		let newEnv = env.get();
		newEnv.LAYOUT = {
			...(newEnv ? newEnv.LAYOUT : null),
			...req.body,
		};
		fs.writeFile(
			env.resource.file,
			JSON.stringify(newEnv, null, 2),
			function(err) {
				if (err)
				{
					return res.json({ status: 'error' });
				}
				else
				{
					return res.json({ status: 'success' });
				}
			}
		);
	}
	catch(e)
	{
		res.json({
			status: 'error',
		});
	}
};
