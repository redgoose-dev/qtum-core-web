/**
 * qtum core
 * qtum-core와 통신하기 위한 인터페이스
 */

const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const setupFile = require('../../modules/setupFile');

const config = setupFile.get('all');
let address = null;


/**
 * get address
 *
 * @return {Boolean}
 */
function getAddress()
{
	address = config.private.CORE_ADDRESS || null;
	return address;
}

/**
 * check exec
 *
 * @param {String} file
 * @return {Object}
 */
function checkExec(file='qtum-cli')
{
	if (!getAddress())
	{
		return {
			status: 'error',
			message: `not found qtum-core address`,
		};
	}

	let addr = `${address}/${file}`;

	if (fs.existsSync(addr))
	{
		return {
			status: 'success',
			command: addr
		};
	}
	else
	{
		return {
			status: 'error',
			command: addr,
			message: `not found qtum-cli`,
		};
	}
}

/**
 * sleep
 *
 * @param {Number} delay
 * @return {Promise}
 */
function sleep(delay=3000)
{
	return new Promise(function(resolve) {
		setTimeout(resolve, delay);
	});
}

/**
 * run cli
 *
 * @param {String} file
 * @param {Boolean} testnet
 * @param {String} params
 * @param {Boolean} json
 * @return {Promise}
 */
async function cli(file='qtum-cli', testnet=false, params='', json=true)
{
	const cmd = checkExec(file);

	// run
	if (cmd.status !== 'success')
	{
		return cmd;
	}

	const word = `${cmd.command} ${testnet ? '-testnet' : ''} ${params}`;
	let res = null;

	try
	{
		res = await exec(word);
	}
	catch(e)
	{
		return {
			status: 'error',
			message: e
		};
	}

	if (res.stdout)
	{
		try
		{
			return {
				status: 'success',
				data: json ? JSON.parse(res.stdout) : res.stdout
			};
		}
		catch(e)
		{
			return {
				status: 'error',
				message: `parsing error/${e}`,
			};
		}
	}

	if (res.stderr)
	{
		return {
			status: 'error',
			message: stderr
		};
	}

	return {
		status: 'success',
		data: null
	};
}


/**
 * action command
 *
 * @param {String} cmd
 * @param {Boolean} testnet
 * @param {Boolean} json
 * @param {Function} cb
 */
exports.action = function(cmd, testnet, json=true, cb)
{
	cli('qtum-cli', testnet, cmd, json).then(cb);
};

/**
 * check core
 *
 * @param {Boolean} testnet
 * @param {Function} cb
 */
exports.check = function(testnet=false, cb)
{
	cli('qtum-cli', testnet, 'getinfo', true).then((res) => {
		if (res.status === 'error')
		{
			cb(false, res.message);
		}
		else
		{
			cb(!!(res && res.status === 'success' && res.data && !!res.data.version));
		}
	});
};

/**
 * control power
 *
 * @param {Boolean} sw
 * @param {Boolean} testnet
 * @param {Function} cb
 */
exports.power = function(sw=true, testnet=false, cb)
{
	const maxTry = 20; // sec
	let count = 0;

	/**
	 * try check core
	 *
	 * 코어를 켜고나면 결과값이 없기 때문에 켜졌는지 알수가 없다.
	 * 그래서 `qtum-cli getinfo`명령을 실행해서 결과값이 나오면 탈출, 아니면 아직 꺼져있다고 간주하고 다시 호출하여 1초후에 다시 명령실행을 반복.
	 * 무한대로 반복되는 부분이다보니 일정횟수를 넘기면 오류상태를 남기고 탈출시킴
	 */
	async function tryCheckCore()
	{
		await sleep(1000);

		const res = await cli('qtum-cli', testnet, 'getwalletinfo', true);
		if (res.status === 'success')
		{
			cb({ status: 'success' });
		}
		else
		{
			if (count < maxTry)
			{
				count++;
				tryCheckCore().then();
			}
			else
			{
				cb({ status: 'error' });
			}
		}
	}

	if (sw)
	{
		// on
		cli('qtumd', testnet, '-daemon', false).then((res) => {
			if (res && res.status === 'success')
			{
				tryCheckCore().then();
			}
			else
			{
				cb(res);
			}
		});
	}
	else
	{
		// off
		cli('qtum-cli', testnet, 'stop', false).then(cb);
	}
};