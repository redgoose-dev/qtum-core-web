// https://nuxtjs.org/api/configuration-servermiddleware

const app = require('express')();
// TODO: export 오류 해결해야함.
//const qtumCore = require('./qtumCore');


module.exports = { path: '/api', handler: app };


app.get('', (req, res) => {
	res.json({
		foo: 'intro',
		path: req.path,
	});
});


app.get('/getinfo', (req, res) => {
	res.json({
		foo: 'getinfo',
		path: req.path,
	});
	//modules.qtumCore.getinfo();
});


app.get('/getstakinginfo', (req, res) => {
	res.json({
		foo: 'getstakinginfo',
		path: req.path,
	});
});
