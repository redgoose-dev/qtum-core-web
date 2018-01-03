/**
 * qtum core
 * qtum-core와 통신하기 위한 인터페이스
 */


let address = null;


export function getinfo()
{
	let command = `getinfo`;
	let result = cli(command);
}

function getAddress()
{
	if (!address)
	{
		try
		{
			let pref = require('~/.data/pref.json');
			address = pref.coreAddress;
		}
		catch(e)
		{
			return null;
		}
	}

	return address;
}

/**
 * check exec
 *
 * @param {String} command
 * @return {Object}
 */
function checkExec(command='')
{
	if (!getAddress())
	{
		return {
			state: 'error',
			message: `not found qtum-core address`,
		};
	}

	// const fs = require('fs');
	// fs.exists(`${address}/${command}`, function(exists) {
	// 	console.log(exists);
	// });
	// let aa = path.existsSync();
	// console.log(aa);

	return {};

	if (false)
	{
		return {
			state: 'error',
			message: `not found qtum-cli`,
		};
	}

	return {

	};
}

function cli(command)
{
	let cmd = checkExec('qtum-cli');

	// check cmd
	if (cmd.state === 'error')
	{
		return cmd;
	}


	console.log(cmd);

	//console.log(addr.message);
	return null;
}
