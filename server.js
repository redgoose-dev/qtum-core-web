const app = require('express')();
const { Nuxt, Builder } = require('nuxt');
const api = require('./api/index');
const env = require('./lib/getConfig');

if (!env) {
	console.error('not found .env');
	return;
}

const host = env.HOST || '127.0.0.1';
const port = env.PORT || 3000;


// Import and set Nuxt.js options
let config = require('./nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');

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
app.listen(port, host);