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
function askBoolean(message='Q: ', active=null)
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
 * apply env
 */
function applyEnv(pw, cb)
{
	return new Promise(function(resolve) {

	});
	// let nextEnv = require(`./${env.resource.file}`);
	// nextEnv.HASH = password.create(pw, 10);
	// nextEnv.HASH_TESTNET = nextEnv.HASH;
	// nextEnv.TOKEN = password.create(String(Date.now()), 5);
	// let str = JSON.stringify(nextEnv, null, 2);
	// env.create(str, function(err, message) {
	// 	printConsole(!!err, message);
	// 	if (cb) cb();
	// });
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
		env.create(null, async function(err, message) {
			printConsole(!!err, message);
			if (!err)
			{
				let data = {};
				data.passwordMainnet = await askText('MAINNET PASSWORD', true);
				data.useTestnetnet = await askBoolean('Do you want to use "TESTNET"?', false);
				if (data.useTestnetnet)
				{
					data.passwordTest = await askText('TESTNET PASSWORD', false);
				}
				console.log(data);
				let result = await applyEnv(data);

				exit();
			}
		});
	}
}


// action
switch(process.argv[2])
{
	case 'change-password':
		// TODO: 함수변경으로 좀 고칠 필요가 있음.
		// inputPassword(function() {
		// 	console.log(consoleColor.green, 'Success change password', consoleColor.reset);
		// 	process.exit();
		// });
		break;
	default:
		setup().then();
		break;
}