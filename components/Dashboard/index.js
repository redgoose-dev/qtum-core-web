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
		console.log('call asyncData() in component');
		return {}
	},

	data: function(params)
	{
		console.log('call data() in component', params);
		return {};
	},

	// fetch ({ store, params })
	// {
	// 	console.log('call fetch');
	// }

	//middleware:
};