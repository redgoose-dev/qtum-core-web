// https://nuxtjs.org/api/configuration-servermiddleware

const express = require('express');
const api = express();

// TODO: export 오류 해결해야함.
const qtumCore = require('./qtumCore');


module.exports = { path: '/api', handler: api };


api.get('', (req, res) => {
	console.log(qtumCore);
	res.json({
		foo: 'api intro',
		path: req.path,
	});
});


api.get('/getinfo', (req, res) => {
	res.json({
		foo: 'getinfo',
		path: req.path,
	});
	//modules.qtumCore.getinfo();
});


api.get('/getstakinginfo', (req, res) => {
	res.json({
		foo: 'getstakinginfo',
		path: req.path,
	});
});
