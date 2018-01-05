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
			state: 'error',
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
			state: 'error',
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
	if (!(callback && typeof callback === 'function')) return null;

	const cmd = checkExec(file);

	// check cmd
	if (cmd.status === 'error')
	{
		return cmd;
	}

	childProcess.exec(`${file} ${params}`, (error, stdout, stderr) => {
		if (error)
		{
			callback({
				status: 'error',
				message: 'exec error'
			}, null);
			return;
		}

		if (stdout)
		{
			try {
				callback(null, {
					status: 'success',
					data: JSON.parse(stdout)
				});
			}
			catch(e)
			{
				callback({
					status: 'error',
					message: 'parsing error',
				}, null);
			}
			return;
		}

		if (stderr)
		{
			callback({
				status: 'error',
				message: 'stderr'
			}, null);
		}
	});
}
