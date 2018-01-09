const app = require('express')();
const { Nuxt, Builder } = require('nuxt');
const api = require('./api/index');
const env = require('./env');
const consoleColor = require('./consoleColor');
const qtumCore = require('./api/qtumCore');

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
	config.env.pref = envConfig;
	config.env.pref.BASE_URL = baseUrl;
	config.head.title = envConfig.TITLE || config.head.title;

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
	app.listen(config.env.pref.PORT, config.env.pref.HOST);
}


// check env
envConfig = env.get();
if (!!envConfig)
{
	qtumCore.check((res, message) => {
		if (!res)
		{
			console.error(`ERROR:`, message);
			return;
		}
		start();
	});
}
else
{
	// if not found `.env` file
	console.error(`ERROR: Not found '.env' file. Please run setup.`);
}