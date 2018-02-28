export default function(cox)
{
	const { $axios, store } = cox;
	const pref = require('../.env');

	$axios.setToken(pref.APPLICATION);
	$axios.setHeader('testnet', store.state.status.testnet);
	console.log('call plugins');
}