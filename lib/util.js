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
	return `${process.env.TITLE || 'QTUM CORE'} / ${childName}`;
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
 * @param {Object} addons
 */
export async function resetStatus($axios, $store, addons={})
{
	try
	{
		let response = await $axios.$post('/api', { hash: $store.state.system.hash });
		if (response.status === 'error') throw '';
		if (!response.info) throw '';

		// set balance
		let balance = (response.info.balance && typeof response.info.balance === 'number') ? response.info.balance : 0;

		// update store
		await $store.commit('changeStatus', {
			core: true,
			coreVersion: response.version,
			staking: response.staking.staking,
			lock: lib.string.getLockInformation(response.wallet.unlocked_until),
			balance: balance,
			testnet: response.info.testnet,
			...addons,
		});
	}
	catch(e)
	{
		// update store
		await $store.commit('changeStatus', {
			error: true,
			errorCode: 600,
			errorMessage: 'qtum-core is turned off.',
			testnet: $store.state.status.testnet,
			...addons,
		});
	}
}


/**
 * set before layout
 *
 * @param {Object} cox
 */
export function setBeforeLayout(cox)
{
	const { $lang, $axios } = cox;

	// set language
	let lang = document.querySelector('html').getAttribute('lang');
	if ($lang)
	{
		$lang.set(lang);
	}
	$axios.setHeader('language', lang);

	// set class name for touch device
	if (lib.util.detectTouch())
	{
		document.querySelector('html').classList.add('touch');
	}
}