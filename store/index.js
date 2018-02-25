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
		theme: lib.constant.theme.dark,
		count__recentTransactions: lib.constant.count.recent_transactions,
		count__transactions: lib.constant.count.transactions,
	},
	system: {
		title: '',
		url_api: '',
		url_explorer: '',
		testnet: false,
		lang: '',
		hash: null,
	},
	openSidebar: true,
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

			// update layout (레이아웃은 결과 상태에 관계없이 가져올 수 있으므로 먼저 업데이트)
			if (result.layout)
			{
				commit('updateLayout', result.layout);
			}

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

		// recovery store from cookie
		if (req.headers.cookie)
		{
			// set sidebar
			let openSidebar = lib.cookie.get(req.headers.cookie, 'openSidebar');
			if (!!openSidebar)
			{
				commit('updateSidebar', openSidebar === '1');
			}
		}
	}
};

// mutations
export const mutations = {
	/**
	 * Update system
	 *
	 * @param {Object} state
	 * @param {Object} value
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
	 *
	 * @param {Object} state
	 * @param {Object} value
	 */
	updateStatus(state, value={})
	{
		state.status = {
			...state.status,
			...value,
		};
	},

	/**
	 * Update layout
	 * 레이아웃에 관한 상태를 업데이트 한다.
	 *
	 * @param {Object} state
	 * @param {Object} value
	 */
	updateLayout(state, value={})
	{
		let newState = {
			...state.layout,
			...value,
		};

		// update
		state.layout = newState;
	},

	/**
	 * remove key
	 * 스토어의 키를 삭제한다.
	 *
	 * @param {Object} state
	 * @param {Array} value `value[0]`은 부모값(status, system, layout)을 지칭하고, `value[1]`은 부모값 속에 들어있는 자식값의 key를 지칭한다.
	 */
	removeKey(state, value=[])
	{
		// check values
		if (!(value[0] && value[1]) && !(typeof value[0] === 'string' && typeof value[1] === 'string'))
		{
			return;
		}

		if (state[value[0]])
		{
			delete state[value[0]][value[1]];
		}
	},

	/**
	 * update sidebar
	 *
	 * @param {Object} state
	 * @param {Boolean} value
	 */
	updateSidebar(state, value=false)
	{
		state.openSidebar = value;
	},
};