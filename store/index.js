import axios from 'axios';


// state
export const state = () => ({
	balance: 0,
	status: {
		core: false,
		staking: false,
	},
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

			// update status
			context.commit('updateStatus', {
				core: true,
				staking: !!(result.info.unlocked_until && result.info.unlocked_until > 0)
			});
			// update balance
			context.commit('updateBalance', result.info.balance);
		}
		catch(e)
		{
			console.error(e);
			context.commit('updateStatus', {
				core: false,
				staking: false
			});
		}
	}
};


// mutations
export const mutations = {

	/**
	 * update balance
	 * 현재 잔액을 업데이트 한다.
	 */
	updateBalance(state, value)
	{
		state.balance = value;
	},

	/**
	 * Update status
	 * 현재의 상태를 업데이트 한다.
	 */
	updateStatus(state, value=false)
	{
		state.status = {
			...state,
			...value,
		};
	},

};