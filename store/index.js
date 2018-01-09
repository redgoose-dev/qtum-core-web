// state
export const state = () => ({
	balance: 0,
});


// action
export const actions = {
	async nuxtServerInit({ commit }) {
		console.log('TODO: call nuxtServerInit() method');
		commit('updateBalance', 9999);
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
	updateBalance(state, value) {
		state.balance = value;
	},

};