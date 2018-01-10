module.exports = {

	head: {
		title: 'Qtum core',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=2' }
		]
	},

	css: [
		'~assets/scss/app.scss'
	],

	modules: [],

	plugins: [
		//{ src: '~/plugins/test.js' }
	],

	build: {
		vendor: [ 'axios' ]
	},

	env: {
		pref: null,
	},

	loading: {
		color: '#2e9ad1',
	},

	router: {
		base: '/',
		middleware: 'init',
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
		//'~/api/index.js'
	],

};