const env = require('../.config/env');


export default function(cox)
{
	const { $axios, store } = cox;

	$axios.setToken(env.APPLICATION);
}