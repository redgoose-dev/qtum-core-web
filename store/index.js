import axios from 'axios';


// state
export const state = () => ({
	core: false,
	balance: 0,
	status: {},
});


// action
export const actions = {
	async nuxtServerInit(context) {
		let result = {};
		try
		{
			// get api data
			result = await axios.get(`${process.env.API_URL}/api`);

			// check server
			if (!(result.status === 200 && !!result.data)) throw 'Server error';

			// check data status
			if (result.data.status === 'error') throw result.data.message;

			// check data
			if (!(result.data)) throw 'Not found data';

			// update data
			result = result.data;

			// update balance
			context.commit('updateCore', true);
			context.commit('updateBalance', result.info.balance);
		}
		catch(e)
		{
			console.error(e);
			context.commit('updateCore', false);
		}
	}
};


// mutations
export const mutations = {

	/**
	 * update balance
	 *
	 * @param {Object} state
	 * @param {Number} value
	 */
	updateBalance(state, value)
	{
		state.balance = value;
	},

	updateCore(state, value=false)
	{
		state.core = value;
	},

};