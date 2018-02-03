export default function(cox)
{
	const { $axios, store } = cox;
	const pref = require('../.env');

	$axios.setToken(pref.TOKEN);
}