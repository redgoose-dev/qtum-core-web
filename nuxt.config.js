module.exports = {

	router: {
		//middleware: 'foo'
	},

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

	env: {},

	loading: {
		color: 'lime',
	},

	// serverMiddleware: [
	// 	'~/api/index.js'
	// ],

};