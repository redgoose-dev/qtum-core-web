/**
 * read config file
 */

const resource = require('./resource');


module.exports = function(type=null)
{
	let config = null;

	try
	{
		switch(type)
		{
			case 'env':
				return require(`../../${resource.dir}/${resource.file_env}`);
			case 'private':
				return require(`../../${resource.dir}/${resource.file_private}`);
			case 'all':
				return {
					env: require(`../../${resource.dir}/${resource.file_env}`),
					private: require(`../../${resource.dir}/${resource.file_private}`),
				};
			default:
				throw 'Wrong type';
		}
	}
	catch(e)
	{
		console.error(e);
		config = null;
	}

	return config;
};