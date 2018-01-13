const express = require('express');
const api = express();


/**
 * init
 *
 * `getinfo` 파라메터로 기초 정보를 요청하고 가져온다.
 * 코어가 작동되는지 검사용으로 사용
 */
api.get('/api', require('./init'));

/**
 * dashboard
 */
api.get('/api/dashboard', require('./dashboard'));

/**
 * transactions
 */
api.get('/api/transactions', require('./transactions'));


// export
module.exports = api;