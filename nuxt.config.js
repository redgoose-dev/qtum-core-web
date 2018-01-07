module.exports = {

	head: {
		title: 'Qtum core',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/static/favicon.ico' }
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
		color: 'lime',
	},

	router: {
		// middleware: 'foo'
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