import * as lib from '../lib';


// state
export const state = () => ({
	system: {
		title: '',
		url_api: '',
		hash: null,
	},
	status: {
		core: false,
		staking: false,
		lock: null,
		unlockForStaking: false,
		balance: 0,
		testnet: false,
	},
	layout: {
		theme: lib.constant.theme.light,
		count__recentTransactions: lib.constant.count.recent_transactions,
		count__transactions: lib.constant.count.transactions,
		language: 'en',
	},
	openSidebar: true,
});

// action
export const actions = {
	async nuxtServerInit(cox, box) {
		const { state, commit } = cox;
		const { req, app } = box;
		const testnet = !!(req.session && req.session.auth && req.session.auth.testnet);

		// get env
		const env = await app.$axios.$get('/api/get-env');

		// update system
		commit('updateSystem', {
			title: env.TITLE || 'QTUM CORE',
			url_api: env.API_URL || 'http://localhost:3000',
			useTestnet: env.USE_TESTNET,
			hash: (req.session.auth && req.session.auth.hash) ? req.session.auth.hash : null,
		});

		//console.log((req.session.auth && req.session.auth.hash) ? req.session.auth.hash : null);

		// update layout
		if (env.LAYOUT)
		{
			commit('updateLayout', env.LAYOUT);
		}

		// set header
		app.$axios.setHeader('testnet', testnet ? 1 : 0);
		// set language
		app.$lang.set(state.layout.language || 'en');

		if (state.system.hash)
		{
			// update status
			try
			{
				// get api data
				const result = await app.$axios.$post(`/api`, {
					hash: state.system.hash,
				});

				// checking
				if (result.status === 'error') throw result;
				if (!result.info) throw { code: 500, message: 'Server error' };

				// update status
				commit('updateStatus', {
					core: true,
					coreVersion: result.version,
					staking: result.staking.staking,
					lock: lib.string.getLockInformation(result.wallet.unlocked_until),
					...((result.info.balance && typeof result.info.balance === 'number') ? { balance: result.info.balance } : null),
					testnet,
				});
			}
			catch(e)
			{
				commit('changeStatus', {
					error: true,
					errorCode: e.code,
					errorMessage: e.message,
					testnet
				});
			}
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
	changeStatus(state, value={})
	{
		state.status = value;
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
		// update
		state.layout = {
			...state.layout,
			...value,
		};
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