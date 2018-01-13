const app = require('express')();
const { Nuxt, Builder } = require('nuxt');
const api = require('./api/index');
const env = require('./env').get();
const consoleColor = require('./consoleColor');
const qtumCore = require('./qtumCore');


/**
 * start server
 */
function start()
{
	// get env
	const pref = env.pref;

	// Import and set Nuxt.js options
	let config = require('../nuxt.config.js');

	// set config
	config.dev = process.env.NODE_ENV !== 'production';
	//config.env = Object.assign(config.env, envConfig);
	//config.env.EXPLORER_URL = env.pref.testnet === 'true' ? 'https://testnet.qtum.org' : 'https://explorer.qtum.org';
	//config.head.title = env.pref.title || config.head.title;

	console.log(consoleColor.yellow, `API SERVER: ${pref.API_URL}`, consoleColor.reset);
	console.log(consoleColor.yellow, `PRODUCTION: ${!config.dev}`, consoleColor.reset);

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
	app.listen(pref.PORT);
}


// check env
if (!!env.pref)
{
	qtumCore.check(function(res, message) {
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