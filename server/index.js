const app = require('express')();
const { Nuxt, Builder } = require('nuxt');
const api = require('./api/index');
const env = require('./env');
let envConfig = null;


/**
 * start server
 */
function start()
{
	let baseUrl = `${envConfig.PROTOCOL}://${envConfig.HOST}:${envConfig.PORT}`;

	console.log('\x1b[33m%s\x1b[0m', `Start server: ${baseUrl}`);

	// Import and set Nuxt.js options
	let config = require('../nuxt.config.js');
	config.dev = envConfig.DEVELOPMENT === 'true';
	config.env.config = envConfig;
	config.env.config.BASE_URL = baseUrl;

	const nuxt = new Nuxt(config);

	// Start build process in dev mode
	if (config.dev)
	{
		const builder = new Builder(nuxt);
		builder.build();
	}

	// extend api middleware to express
	app.use(api);

	// Give nuxt middleware to express
	app.use(nuxt.render);

	// Start express server
	app.listen(config.env.config.PORT, config.env.config.HOST);
}


// check env
envConfig = env.get();
if (!!envConfig)
{
	start();
}
else
{
	console.error(`Not found '.env'. But try create '.env' file`);
	env.create(function(result) {
		if (result)
		{
			envConfig = env.get();
			start();
		}
	});
}