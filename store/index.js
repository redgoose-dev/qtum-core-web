import * as lib from '../lib';


// state
export const state = () => ({
	status: {
		core: false,
		staking: false,
		lock: null,
		unlockForStaking: false,
		balance: 0,
	},
	layout: {
		openSidebar: true,
		dashboard__count_recent: 5,
	},
	system: {
		title: '',
		url_api: '',
		url_explorer: '',
		testnet: false,
		lang: '',
		hash: null,
		token: null,
	},
});

// action
export const actions = {
	async nuxtServerInit(cox, { req, app }) {
		const { state, commit } = cox;
		const pref = require('../.env.json');

		// update system
		let system = {
			title: pref.TITLE || 'QTUM CORE',
			url_api: pref.API_URL || 'http://localhost:3000',
			url_explorer: pref.TESTNET ? 'https://testnet.qtum.org' : 'https://explorer.qtum.org',
			testnet: pref.TESTNET || false,
			lang: pref.LANGUAGE || 'en',
			hash: null,
		};
		// set hash
		if (req.session.auth && req.session.auth.hash)
		{
			let hash = req.session.auth.hash;
			if (hash && typeof hash === 'string')
			{
				system.hash = (hash === pref.HASH) ? hash : null;
			}
		}
		commit('updateSystem', system);

		// update status
		try
		{
			// get api data
			let result = await app.$axios.$get(`/api`);

			if (result.status === 'error') throw result;

			// check server
			if (!result.info) throw 'Server error';

			// update status
			commit('updateStatus', {
				core: true,
				coreVersion: result.version,
				staking: result.staking.staking,
				lock: lib.string.getLockInformation(result.wallet.unlocked_until),
				...((result.info.balance && typeof result.info.balance === 'number') ? { balance: result.info.balance } : null)
			});
		}
		catch(e)
		{
			console.error('[STORE ERROR]', e);
			commit('updateStatus', {
				error: true,
				errorCode: e.code,
				errorMessage: e.message
			});
		}

		// recovery store from layout
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