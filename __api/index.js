// https://nuxtjs.org/api/configuration-servermiddleware

const app = require('express')();
module.exports = { path: '/api', handler: app };


app.get('', (req, res) => {
	res.json({
		foo: 'bar',
		path: req.path,
	});
});
