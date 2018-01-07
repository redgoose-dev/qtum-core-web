// https://nuxtjs.org/api/configuration-servermiddleware

const express = require('express');
const async = require('async');
const api = express();

const qtumCore = require('./qtumCore');


function dashboard(req, res)
{
	const tasks = [
		function (callback) {
			qtumCore.action('getinfo', '', (err, result) => {
				callback(err, result);
			});
		}
	];
	async.parallel(tasks, function(err, result) {
		if (err)
		{
			return;
		}

		console.log(result);
		res.json({
			...result,
			path: req.path,
		});
	});
}


/**
 * ROUTE AREA
 */

api.get('/api', (req, res) => {
	qtumCore.action('getinfo', (result) => {
		res.json({
			...result,
			path: req.path,
		});
	});
});


api.get('/api/getinfo', (req, res) => {
	qtumCore.action('getinfo', (result) => {
		res.json({
			...result,
			name: 'getinfo',
			path: req.path,
		});
	});
});


api.get('/api/getstakinginfo', (req, res) => {
	res.json({
		name: 'getstakinginfo',
		path: req.path,
	});
});


module.exports = api;