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

/**
 * `getinfo` 파라메터로 기초 정보를 요청하고 가져온다.
 * 코어가 작동되는지 검사용으로 사용
 */
api.get('/api', (req, res) => {
	qtumCore.action('getinfo', (result) => {
		res.json({
			...result,
			path: req.path,
		});
	});
});


/**
 * dashboard
 */
api.get('/api/dashboard', (req, res) => {
	// TODO: 여러 api를 호출해서 조합하여 한 뭉치로 만들고 아웃풋 뽑아내기. `dashboard()` 함수 참고

	res.json({
		status: 'error',
		message: 'TODO: 작업예정....'
	});
});


// api.get('/api/getinfo', (req, res) => {
// 	qtumCore.action('getinfo', (result) => {
// 		res.json({
// 			...result,
// 			name: 'getinfo',
// 			path: req.path,
// 		});
// 	});
// });
//
//
// api.get('/api/getstakinginfo', (req, res) => {
// 	res.json({
// 		name: 'getstakinginfo',
// 		path: req.path,
// 	});
// });


module.exports = api;