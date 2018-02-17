/**
 * qtum core
 * qtum-core와 통신하기 위한 인터페이스
 */

const fs = require('fs');
const childProcess = require('child_process');
const env = require('../env');

const config = env.get();
let address = null;


/**
 * get address
 *
 * @return {Boolean}
 */
function getAddress()
{
	address = config.CORE_ADDRESS || null;
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
 * run cli
 *
 * @param {String} file
 * @param {Boolean} testnet
 * @param {String} params
 * @param {Boolean} json
 * @param {Function} callback
 */
function cli(file='qtum-cli', testnet=null, params='', json=true, callback)
{
	if (!(callback && typeof callback === 'function')) callback({
		status: 'error',
		message: 'Not found callback'
	});

	const cmd = checkExec(file);
	testnet = (typeof testnet !== 'boolean') ? config.TESTNET : testnet;

	function onChildProcess(error, stdout, stderr)
	{
		if (error)
		{
			callback({
				status: 'error',
				message: error
			});
			return;
		}

		if (stdout)
		{
			try
			{
				callback({
					status: 'success',
					data: json ? JSON.parse(stdout) : stdout
				});
			}
			catch(e)
			{
				callback({
					status: 'error',
					message: `parsing error/${e}`,
				});
			}
			return;
		}

		if (stderr)
		{
			callback({
				status: 'error',
				message: 'stderr'
			});
		}

		if (!error)
		{
			callback({
				status: 'success',
				data: null
			});
		}
	}

	// run
	if (cmd.status === 'success')
	{
		childProcess.exec(`${cmd.command} ${testnet ? '-testnet' : ''} ${params}`, onChildProcess);
	}
	else
	{
		callback(cmd);
	}
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
	cli('qtum-cli', testnet, cmd, json, cb);
};

/**
 * check core
 *
 * @param {Boolean} testnet
 * @param {Function} cb
 */
exports.check = function(testnet=false, cb)
{
	cli('qtum-cli', testnet, 'getinfo', true, function(res) {
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
	 * 코어를 켜고나면 결과값이 없기 때문에 켜졌는지 알수가 없다.
	 * 그래서 `qtum-cli getinfo`명령을 실행해서 결과값이 나오면 탈출, 아니면 아직 꺼져있다고 간주하고 다시 호출하여 1초후에 다시 명령실행을 반복.
	 * 무한대로 반복되는 부분이다보니 일정횟수를 넘기면 오류상태를 남기고 탈출시킴
	 */
	function tryCheckCore()
	{
		setTimeout(function() {
			cli('qtum-cli', testnet, 'getinfo', true, function(res) {
				if (res.status === 'success')
				{
					cb({ status: 'success' });
				}
				else
				{
					if (count < maxTry)
					{
						count++;
						tryCheckCore();
					}
					else
					{
						cb({ status: 'error' });
					}
				}
			});
		}, 1000);
	}

	if (sw)
	{
		// on
		cli('qtumd', testnet, '-daemon', false, function(res) {
			if (res.status === 'success')
			{
				tryCheckCore();
			}
			else
			{
				cb(res)
			}
		});
	}
	else
	{
		// off
		cli('qtum-cli', testnet, 'stop', false, cb);
	}
};