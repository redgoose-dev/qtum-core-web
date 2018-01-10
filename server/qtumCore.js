/**
 * qtum core
 * qtum-core와 통신하기 위한 인터페이스
 */

const fs = require('fs');
const childProcess = require('child_process');
const env = require('./env');

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
 * @param {String} params
 * @param {Function} callback
 */
function cli(file='qtum-cli', params='', callback)
{
	if (!(callback && typeof callback === 'function')) callback({
		status: 'error',
		message: 'Not found callback'
	});

	const cmd = checkExec(file);

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
					data: JSON.parse(stdout)
				});
			}
			catch(e)
			{
				callback({
					status: 'error',
					message: 'parsing error',
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
	}

	// run
	if (cmd.status === 'success')
	{
		childProcess.exec(`${file} ${config.TESTNET === 'true' ? '-testnet' : ''} ${params}`, onChildProcess);
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
 * @param {Function} cb
 */
exports.action = function(cmd, cb)
{
	cli('qtum-cli', cmd, cb);
};

/**
 * check core
 *
 * @param {Function} cb
 */
exports.check = function(cb)
{
	cli('qtum-cli', 'getinfo', function(res) {
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