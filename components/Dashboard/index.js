// core
import * as core from '~/modules/core';
// library
import * as lib from '~/lib';


export default {
	head: {
		title: lib.util.makeTitle('Dashboard')
	},

	asyncData: function(params)
	{
		console.log('call asyncData()');
		return {}
	},

	data: function(params)
	{
		console.log('call data()');
		return {};
	},

	// fetch ({ store, params })
	// {
	// 	console.log('call fetch');
	// }
};