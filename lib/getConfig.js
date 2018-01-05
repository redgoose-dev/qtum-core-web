let env = null;
let config = null;

try
{
	env = require('dotenv').config();
	config = env.parsed;
}
catch(e)
{
	console.error(e);
}


module.exports = env.parsed;