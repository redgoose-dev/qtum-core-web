const fs = require('fs');
const ask = require('./modules/ask');
const setupFile = require('./modules/setupFile');
const password = require('./modules/password');
const consoleColor = require('./modules/consoleColor');


const path = {
	env: `${setupFile.resource.dir}/${setupFile.resource.file_env}`,
	private: `${setupFile.resource.dir}/${setupFile.resource.file_private}`,
};


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
		ask(`${message}${required ? ' (required)' : ''}: `, function(str) {
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
 * check config file
 *
 * @return {Boolean}
 */
function checkConfigFile()
{
	return (
		fs.existsSync(path.env) &&
		fs.existsSync(path.private)
	);
}

/**
 * write setup file
 *
 * @param {String} type
 * @param {Object} data
 * @return {Promise}
 */
async function writeConfigFile(type='env', data)
{
	try
	{
		let str = JSON.stringify(data, null, 2);
		let result = await setupFile.create(type, str);
		printConsole(!!result.error, result.message);
	}
	catch(e)
	{
		printConsole(true, `Error make "${path[type]}" file`);
	}
	return;
}

/**
 * setup
 *
 * @return {Promise}
 */
async function setup()
{
	if (!fs.existsSync(setupFile.resource.dir))
	{
		fs.mkdirSync(setupFile.resource.dir);
	}

	if (checkConfigFile())
	{
		// if exist `.env.json` file

		let reinstall = await askBoolean(`Exist setup file. Reinstall?`, false);
		if (reinstall)
		{
			// delete files
			try { fs.unlinkSync(path.env); } catch(e) {}
			try { fs.unlinkSync(path.private); } catch(e) {}

			// play setup
			setup().then();
		}
		else
		{
			exit();
		}
	}
	else
	{
		// if not found config

		let resultCreate = {};
		let config = {};

		// make config files
		resultCreate.env = await setupFile.create('env', null);
		resultCreate.private = await setupFile.create('private', null);

		// print console
		printConsole(!!resultCreate.env.error, resultCreate.env.message);
		printConsole(!!resultCreate.private.error, resultCreate.private.message);

		// get config
		config.env = (!resultCreate.env.error) ? require(`./${path.env}`) : null;
		config.private = (!resultCreate.private.error) ? require(`./${path.private}`) : null;

		if (!(config.env && config.private)) exit();

		// set application
		config.env.APPLICATION = password.create(String(Date.now()), 5);

		// set mainnet password
		let passwordMainnet = await askText('Set mainnet password', true);
		config.private.HASH_MAINNET = password.create(passwordMainnet, 10);

		// set use testnet
		config.env.USE_TESTNET = await askBoolean('Do you want to use "TESTNET"?', false);

		// set testnet password
		if (config.env.USE_TESTNET)
		{
			let passwordTestnet = await askText('Set testnet password', false);
			config.private.HASH_TESTNET = password.create(passwordTestnet, 10);
		}

		// TODO: 나중에 자동으로 qtum-cli 찾아주는 기능 추가가 필요함.
		config.private.CORE_ADDRESS = await askText('Qtum core address? ex:`/usr/local/bin/`', true);

		// write setup files
		writeConfigFile('env', config.env).then();
		writeConfigFile('private', config.private).then();

		exit();
	}
}

/**
 * change password
 *
 * @return {Promise}
 */
async function changePassword()
{
	let nextConfig = setupFile.get('all');
	let pw_testnet = '';
	let pw_mainnet = '';
	let str = null;
	let result = null;

	switch(process.argv[3])
	{
		case '-testnet':
			pw_testnet = await askText('Change input testnet password', false);
			nextConfig.env.USE_TESTNET = true;
			nextConfig.private.HASH_TESTNET = password.create(pw_testnet, 10);

			// update env file
			str = JSON.stringify(nextConfig.env, null, 2);
			result = await setupFile.create('env', str);
			printConsole(!!result.error, result.message);
			break;
		case '-mainnet':
		default:
			pw_mainnet = await askText('Change input mainnet password', true);
			nextConfig.private.HASH_MAINNET = password.create(pw_mainnet, 10);
			break;
	}

	// update private file
	str = JSON.stringify(nextConfig.private, null, 2);
	result = await setupFile.create('private', str);
	printConsole(!!result.error, result.message);

	// exit
	exit();
}

/**
 * remake application key
 */
async function remakeApplication()
{
	let nextEnv = setupFile.get('env');
	nextEnv.APPLICATION = password.create(String(Date.now()), 5);

	// update env
	let str = JSON.stringify(nextEnv, null, 2);
	let result = await setupFile.create('env', str);

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