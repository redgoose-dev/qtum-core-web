const fs = require('fs-extra');
const ask = require('./modules/ask');
const env = require('./modules/env');
const password = require('./modules/password');
const consoleColor = require('./modules/consoleColor');


/**
 * ask text
 *
 * @param {String} message
 * @param {Boolean} required
 * @param {String} errorMessage
 * @return {Promise}
 */
function askText(message, required=false, errorMessage=null)
{
	return new Promise(function(resolve) {
		ask(`${message}${required ? '(required)' : ''}: `, function(str) {
			if (!str && required)
			{
				if (errorMessage) printConsole(true, errorMessage);
				askText(message, required, errorMessage).then(resolve);
			}
			else
			{
				resolve(str);
			}
		});
	});
}
/**
 * ask Yes & No
 *
 * @param {String} message
 * @param {Boolean} active
 */
function askBoolean(message='Question?', active=null)
{
	return new Promise(function(resolve) {
		ask(`${message} (${active === true ? 'Y' : 'y'}/${active === false ? 'N' : 'n'}) : `, function(str) {
			if (str)
			{
				str = str.toLowerCase();
			}
			else
			{
				str = (active === null) ? null : (active ? 'y' : 'n');
			}
			switch(str)
			{
				case 'y':
					resolve(true);
					break;
				case 'n':
					resolve(false);
					break;
				default:
					askBoolean(message, active).then(resolve);
					break;
			}
		})
	});

}

/**
 * print console
 *
 * @param {Boolean} err
 * @param {String} message
 */
function printConsole(err, message)
{
	if (err)
	{
		console.error(message);
	}
	else
	{
		console.log(consoleColor.green, message, '\x1b[0m', consoleColor.reset);
	}
}

/**
 * exit setup
 */
function exit()
{
	console.log(consoleColor.green, 'exit setup', consoleColor.reset);
	process.exit();
}

/**
 * setup
 *
 * @return {Promise}
 */
async function setup()
{
	// check `.env.json` file
	if (fs.existsSync(env.resource.file))
	{
		// if exist `.env.json` file
		let reinstall = await askBoolean(`exist "${env.resource.file}" file. Reinstall?`, false);
		if (reinstall)
		{
			fs.unlinkSync(env.resource.file);
			setup().then();
		}
		else
		{
			exit();
		}
	}
	else
	{
		// if not found `.env.json`
		let result = await env.create(null);
		printConsole(!!result.error, result.message);
		if (!result.error)
		{
			let nextEnv = require(`./${env.resource.file}`);
			let data = {};
			data.passwordMainnet = await askText('Set mainnet password', true);
			data.useTestnet = await askBoolean('Do you want to use "TESTNET"?', false);
			if (data.useTestnet)
			{
				data.passwordTestnet = await askText('Set testnet password', false);
			}

			// write env
			nextEnv.HASH_MAINNET = password.create(data.passwordMainnet, 10);
			nextEnv.USE_TESTNET = data.useTestnet;
			if (nextEnv.USE_TESTNET)
			{
				nextEnv.HASH_TESTNET = password.create(data.passwordTestnet, 10);
			}
			nextEnv.APPLICATION = password.create(String(Date.now()), 5);

			// update env
			let str = JSON.stringify(nextEnv, null, 2);
			let result = await env.create(str);

			// print console
			printConsole(!!result.error, result.message);

			// exit
			exit();
		}
	}
}

/**
 * change password
 *
 * @return {Promise}
 */
async function changePassword()
{
	let nextEnv = require(`./${env.resource.file}`);
	let pw_testnet = '';
	let pw_mainnet = '';

	switch(process.argv[3])
	{
		case '-testnet':
			pw_testnet = await askText('Change input testnet password', false);
			nextEnv.USE_TESTNET = true;
			nextEnv.HASH_TESTNET = password.create(pw_testnet, 10);
			break;
		case '-mainnet':
		default:
			pw_mainnet = await askText('Change input mainnet password', true);
			nextEnv.HASH_MAINNET = password.create(pw_mainnet, 10);
			break;
	}

	// update env
	let str = JSON.stringify(nextEnv, null, 2);
	let result = await env.create(str);

	// print console
	printConsole(!!result.error, result.message);

	// exit
	exit();
}

/**
 * remake application key
 */
async function remakeApplication() {
	let nextEnv = require(`./${env.resource.file}`);
	nextEnv.APPLICATION = password.create(String(Date.now()), 5);

	// update env
	let str = JSON.stringify(nextEnv, null, 2);
	let result = await env.create(str);

	// print console
	printConsole(!!result.error, result.message);

	// exit
	exit();
}


// action
switch(process.argv[2])
{
	case '-change-password':
		changePassword().then();
		break;

	case '-remake-application':
		remakeApplication().then();
		break;

	default:
		setup().then();
		break;
}