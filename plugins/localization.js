import Vue from 'vue';


/**
 * try get string
 *
 * @param {Object} tree
 * @param {String} address
 * @return {String}
 */
function tryGetString(tree, address)
{
	try
	{
		return eval(`tree.${address}`);
	}
	catch(e)
	{
		return null;
	}
}


const localization = {

	selected: 'en',
	tree: {
		en: require('../assets/languages/en'),
		ko: require('../assets/languages/ko'),
	},

	set: function(code)
	{
		this.selected = code;
	},

	out: function(address=null)
	{
		let addr = '';

		addr = `${this.selected}.${address}`;
		if (tryGetString(this.tree, addr))
		{
			return tryGetString(this.tree, addr);
		}

		addr = `en.${address}`;
		if (tryGetString(this.tree, addr))
		{
			return tryGetString(this.tree, addr);
		}

		return address;
	}

};


// set use plugin
Vue.use({
	install: function(Vue)
	{
		Vue.prototype.$lang = localization;
	},
});


export default function(cox, inject)
{
	const { app } = cox;

	cox.$lang = app.$lang = localization;
}