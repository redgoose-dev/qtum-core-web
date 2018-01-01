module.exports = {
	head: {
		title: 'nsdiogsd',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
		]
	},

	css: [
		'~assets/scss/app.scss'
	],

	modules: [],

	plugins: [],

	build: {
		vendor: [ 'axios' ]
	},

	env: {},

	loading: { color: 'lime' }
};