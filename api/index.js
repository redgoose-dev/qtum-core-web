const express = require('express');
const router = express.Router();


// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express();
router.use((req, res, next) => {
	Object.setPrototypeOf(req, app.request);
	Object.setPrototypeOf(res, app.response);
	req.res = res;
	res.req = req;
	next();
});


/**
 * init
 *
 * `getinfo` 파라메터로 기초 정보를 요청하고 가져온다.
 * 코어가 작동되는지 검사용으로 사용
 */
router.get('/', require('./init'));

/**
 * dashboard
 */
router.get('/dashboard', require('./dashboard'));

/**
 * transactions
 */
router.get('/transactions', require('./transactions'));

/**
 * wallets
 */
router.get('/receive', require('./receive'));

/**
 * auth
 */
router.post('/login', require('./auth'));
router.post('/logout', require('./auth'));

/**
 * core
 */
router.post('/core-power', require('./core'));
router.post('/core-unlock', require('./core'));
router.post('/core-lock', require('./core'));

/**
 * etc
 */
router.post('/update-layout', require('./update-layout'));



// export
module.exports = {
	path: '/api',
	handler: router
};