import axios from 'axios';
import * as lib from '../lib';


const pref = require('../.env');


// state
export const state = () => ({
	status: {
		core: false,
		staking: false,
		balance: 0,
	},
	layout: {
		openSidebar: true,
		dashboard__count_recent: 10,
	},
	system: {
		title: pref.TITLE || 'QTUM CORE',
		url_api: pref.API_URL || 'http://localhost:3000',
		url_explorer: pref.TESTNET ? 'https://testnet.qtum.org' : 'https://explorer.qtum.org',
		cmd_qtum: pref.CORE_ADDRESS || '',
		testnet: pref.TESTNET || false,
		lang: pref.LANGUAGE || 'en',
	},
});


// action
export const actions = {
	async nuxtServerInit({ state, commit }, { req }) {
		// get api datas
		let result = {};
		try
		{
			// get api data
			result = await axios.get(`${state.system.url_api}/api`);

			// check server
			if (!(result.status === 200 && !!result.data)) throw 'Server error';

			// check data status
			if (result.data.status === 'error') throw result.data.message;

			// check data
			if (!(result.data)) throw 'Not found data';

			// update data
			result = result.data;

			// update status
			commit('updateStatus', {
				core: true,
				staking: !!(result.info.unlocked_until && result.info.unlocked_until > 0),
				...((result.info.balance && typeof result.info.balance === 'number') ? { balance: result.info.balance } : null)
			});
		}
		catch(e)
		{
			console.error('Error get API in store');
			commit('updateStatus', {
				core: false,
			});
		}

		// restore layout
		if (req.headers.cookie)
		{
			let layout = lib.cookie.get(req.headers.cookie, 'layout');
			if (layout && typeof layout === 'string')
			{
				layout = JSON.parse(layout);
				commit('updateLayout', {
					...state.layout,
					...layout
				});
			}
		}
	}
};


// mutations
export const mutations = {
	/**
	 * Update system
	 */
	updateSystem(state, value={})
	{
		state.system = {
			...state.system,
			...value,
		};
	},

	/**
	 * Update status
	 * 현재의 상태를 업데이트 한다.
	 */
	updateStatus(state, value=false)
	{
		state.status = {
			...state.status,
			...value,
		};
	},

	/**
	 * change balance
	 * 가격을 변경한다.
	 */
	changeBalance(state, value=0)
	{},

	/**
	 * Update layout
	 * 레이아웃에 관한 상태를 업데이트 한다.
	 */
	updateLayout(state, value={})
	{
		let newState = {
			...state.layout,
			...value,
		};

		// set cookie
		lib.cookie.set('layout', JSON.stringify(newState), 7);

		// update
		state.layout = newState;
	},
};