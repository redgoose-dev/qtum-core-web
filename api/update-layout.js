const fs = require('fs');
const setupFile = require('../modules/setupFile');


module.exports = function(req, res)
{
	try
	{
		let newEnv = setupFile.get('env');
		newEnv.LAYOUT = {
			...(newEnv ? newEnv.LAYOUT : null),
			...req.body,
		};
		fs.writeFile(
			`${setupFile.resource.dir}/${setupFile.resource.file_env}`,
			JSON.stringify(newEnv, null, 2),
			function(err) {
				if (err)
				{
					return res.json({ status: 'error' });
				}
				else
				{
					return res.json({
						status: 'success',
						data: newEnv.LAYOUT,
					});
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
