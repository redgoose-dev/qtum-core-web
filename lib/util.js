import config from '../nuxt.config';
import * as lib from './';


let timer = null;


/**
 * make title
 *
 * @param {String} childName
 * @return {String}
 */
export function makeTitle(childName)
{
	return `${process.env.TITLE || config.head.title} / ${childName}`;
}


/**
 * get config
 *
 * @return {Object}
 */
export function getConfig()
{
	return config;
}


/**
 * sleep
 *
 * @param {Number} delay
 * @return {Promise}
 */
export function sleep(delay=300)
{
	return new Promise(function(resolve) {
		if (timer)
		{
			clearTimeout(timer);
			timer = null;
		}
		timer = setTimeout(resolve, delay);
	});
}


/**
 * printf
 *
 * @param {String} str
 * @param {String} values
 * @return {String}
 */
export function printf(str, ...values)
{
	for (let i = 0; i < values.length; i++)
	{
		let pattern = `\\{${i}\\}`;
		let replace = new RegExp(pattern, 'g');
		str = str.replace(replace, values[i]);
	}
	return str;
}


/**
 * detect touch
 *
 * @return {Boolean}
 */
export function detectTouch()
{
	return !!('ontouchstart' in window || navigator.maxTouchPoints);
}


/**
 * reset status
 *
 * @param {Object} $axios
 * @param {Object} $store
 */
export async function resetStatus($axios, $store)
{
	try
	{
		let response = await $axios.$get('/api');
		if (response.status === 'error') throw '';
		if (!response.info) throw '';

		// update store
		$store.commit('updateStatus', {
			core: true,
			coreVersion: response.version,
			staking: response.staking.staking,
			lock: lib.string.getLockInformation(response.wallet.unlocked_until),
			...((response.info.balance && typeof response.info.balance === 'number') ? { balance: response.info.balance } : null)
		});
		$store.commit('removeKey', ['status', 'error']);
		$store.commit('removeKey', ['status', 'errorCode']);
		$store.commit('removeKey', ['status', 'errorMessage']);
	}
	catch(e)
	{
		// update store
		$store.commit('updateStatus', {
			core: false,
			error: true,
			errorCode: 600,
			errorMessage: 'qtum-core is turned off.',
		});
		$store.commit('removeKey', ['status', 'coreVersion']);
		$store.commit('removeKey', ['status', 'lock']);
		$store.commit('removeKey', ['status', 'staking']);
		$store.commit('removeKey', ['status', 'unlockForStaking']);
		$store.commit('removeKey', ['status', 'balance']);
	}
}