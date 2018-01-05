export const state = () => ({
	balance: 0,
});


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