import * as lib from '../lib';


/**
 * correction datas
 *
 * @param {Object} src
 * @param {Object} store
 * @return {Object}
 */
function correction(src, store)
{
	let url_explorer = lib.constant.urlExplorer[store.status.testnet ? 'testnet': 'mainnet'];
	let result = {
		balance: (src.info.balance || 0).toFixed(6),
		immature_balance: (src.wallet.immature_balance || 0).toFixed(6),
		unconfirmed_balance: (src.wallet.unconfirmed_balance || 0).toFixed(6),
		stake: (src.info.stake || 0).toFixed(6),
		version: src.info.version,
		blocks: lib.number.toLocaleNumber(src.info.blocks),
		staking: src.staking.staking,
		networkWeight: lib.number.toLocaleNumber(src.staking.netstakeweight, 0.00000001),
		connections: src.info.connections,
		transactions: src.transactions.map((o, k) => {
			return {
				address: o.address,
				amount: (o.amount || 0).toFixed(6),
				time: lib.date.getFormatDate(lib.date.unixToDate(o.time)),
				type: o.category,
				confirm: o.confirmations,
				txid: o.txid,
				fee: o.fee || 0,
				txUrl: `${url_explorer}/tx/${o.txid}`,
			};
		})
	};

	// set status
	if (src.info.unlocked_until === undefined)
	{
		result.walletStatus = 'Not Encrypted';
	}
	else if (src.info.unlocked_until && src.info.unlocked_until > 0)
	{
		result.walletStatus = (store.status.unlockForStaking) ? 'Unlocked For Staking' : 'Unlocked';
	}
	else
	{
		result.walletStatus = 'Locked';
	}

	return result;
}


export default {
	computed: {
		core() { return this.$store.state.status.core; },
	},

	middleware: 'checkCore',

	async asyncData(cox)
	{
		const { params, error, store, $axios } = cox;
		let result = {
			balance: 0,
			immature_balance: 0,
			unconfirmed_balance: 0,
			stake: 0,
			version: 0,
			blocks: 0,
			staking: false,
			networkWeight: 0,
			connections: 0,
			testnet: !!store.state.status.testnet,
			transactions: [],
			walletStatus: 'Locked',
		};

		if (!store.state.status.core) return;

		try
		{
			const count = store.state.layout.count__recentTransactions;
			let res = await $axios.$get(`/api/dashboard/?count_recent=${count}`);
			if (!res.info) throw 'API import failed.';
			return {
				...result,
				...correction(res, store.state),
				version: store.state.status.coreVersion,
			};
		}
		catch(e)
		{
			error({
				statusCode: 400,
				title: 'Dashboard',
				message: 'Failed to import API',
			});
		}
	},
}