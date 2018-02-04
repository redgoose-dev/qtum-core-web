import * as lib from '../lib';


/**
 * Get lock information
 *
 * @param {Number} unlocked_until
 * @return {String}
 */
function getLockInformation(unlocked_until=null)
{
	if (unlocked_until === 0)
	{
		return 'encrypted'; // 잠겨있음
	}
	else if (unlocked_until > 0)
	{
		return 'unLock'; // 잠김해제되어있음
	}
	else
	{
		return 'notEncrypted'; // 잠금설정되어있지 않음
	}
}


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
		useAuth: false,
		notAllow: [],
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
			useAuth: pref.USE_AUTH || false,
			notAllow: pref.NOT_ALLOW || [],
			hash: null,
		};
		// set hash
		if (req.headers.cookie)
		{
			let hash = lib.cookie.get(req.headers.cookie, 'hash');
			// 쿠키에 있는 `hash`값 검사
			if (hash && typeof hash === 'string')
			{
				// 쿠키에 있는 `hash`와 `env.HASH`에 있는 값을 대조해본다.
				hash = decodeURIComponent(hash);
				system.hash = (hash === pref.HASH) ? hash : null;
			}
		}
		commit('updateSystem', system);

		// update status
		try
		{
			let result = {};

			// get api data
			result = await app.$axios.$get(`/api`);

			if (result.status === 'error') throw result;

			// check server
			if (!result.info) throw 'Server error';

			// update status
			commit('updateStatus', {
				core: true,
				staking: result.staking.staking,
				lock: getLockInformation(result.wallet.unlocked_until),
				...((result.info.balance && typeof result.info.balance === 'number') ? { balance: result.info.balance } : null)
			});
		}
		catch(e)
		{
			console.error('[Store error]', e);
			commit('updateStatus', {
				error: true,
				errorCode: e.code,
				errorMessage: e.message
			});
			return;
		}

		// store recovery from layout
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