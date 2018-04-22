const bodyParser = require('body-parser');
const session = require('express-session');
const setupFile = require('./modules/setupFile');
const env = setupFile.get('env');


module.exports = {

	head: {
		title: 'Qtum core',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ name: 'apple-mobile-web-app-capable', content: 'yes' },
			{ name: 'mobile-web-app-capable', content: 'yes' },
			{ name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
		],
		link: [
			{ rel: 'shortcut icon', href: '/favicon.ico' },
			{ rel: 'icon', type: 'image/x-icon', href: '/images/icon-256x256.png' },
			{ rel: 'apple-touch-icon', href: '/images/icon-256x256.png' },
			{ rel: 'manifest', href: '/manifest.json' },
		]
	},

	css: [
		'~assets/scss/app.scss'
	],

	build: {
		extractCSS: true,
	},

	modules: [
		'@nuxtjs/axios',
	],

	plugins: [
		'~/plugins/axios',
		'~/plugins/localization',
	],

	axios: {
		baseURL: env.API_URL,
	},

	env: {
		TITLE: env.TITLE || 'Qtum core',
		API_URL: env.API_URL || 'http://localhost:3000',
	},

	loading: {
		color: '#2e9ad1',
	},

	router: {
		base: '/',
		middleware: ['hook'],
		linkActiveClass: 'nuxt-active',
		extendRoutes (routes, resolve) {
			routes.push(...[
				{
					name: 'dashboard',
					path: '/dashboard',
					component: '~/pages/index.vue',
				}
			]);
		}
	},

	serverMiddleware: [
		// body-parser middleware
		bodyParser.json(),
		// session middleware
		session({
			secret: 'super-secret-key',
			resave: false,
			saveUninitialized: false,
			cookie: { maxAge: 60000 }
		}),
		'~/api',
	],

};