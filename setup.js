const fs = require('fs-extra');
const ask = require('./modules/ask');
const env = require('./modules/env');
const password = require('./modules/password');
const consoleColor = require('./modules/consoleColor');


/**
 * setup
 */
function setup()
{
	// check `.env.json` file
	if (fs.existsSync(env.resource.file))
	{
		// if exist `.env.json` file
		ask(`exist "${env.resource.file}" file. reinstall? (y/N) : `, function(str) {
			switch (str)
			{
				case 'y':
					fs.unlinkSync(env.resource.file);
					setup();
					break;
				default:
					exit();
					break;
			}
		});
	}
	else
	{
		// if not found `.env.json`
		env.create(null, function(err, message) {
			printConsole(!!err, message);
			if (!err)
			{
				inputPassword(function() {
					exit();
				});
			}
		});
	}
}

/**
 * input password
 *
 * @param {Function} cb
 */
function inputPassword(cb)
{
	// input password
	ask('input password: ', function(pw) {
		let nextEnv = require(`./${env.resource.file}`);
		nextEnv.HASH = password.create(pw, 10);
		nextEnv.HASH_TESTNET = nextEnv.HASH;
		nextEnv.TOKEN = password.create(String(Date.now()), 5);
		let str = JSON.stringify(nextEnv, null, 2);
		env.create(str, function(err, message) {
			printConsole(!!err, message);
			if (cb) cb();
		});

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


// action
switch(process.argv[2])
{
	case 'change-password':
		inputPassword(function() {
			console.log(consoleColor.green, 'Success change password', consoleColor.reset);
			process.exit();
		});
		break;
	default:
		setup();
		break;
}