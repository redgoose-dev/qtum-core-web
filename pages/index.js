import axios from 'axios';
import moment from 'moment';
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
	let result = {
		balance: src.info.balance.toFixed(6),
		immature_balance: src.wallet.immature_balance.toFixed(6),
		unconfirmed_balance: src.wallet.unconfirmed_balance.toFixed(6),
		stake: src.info.stake.toFixed(6),
		version: src.info.version,
		blocks: lib.number.toLocaleNumber(src.info.blocks),
		staking: src.staking.staking,
		networkWeight: lib.number.toLocaleNumber(src.staking.netstakeweight, 0.00000001),
		connections: src.info.connections,
		transactions: src.transactions.map((o, k) => {
			return {
				address: o.address,
				amount: o.amount.toFixed(6),
				time: moment.unix(o.time).format('YYYY-MM-DD HH:mm'),
				type: o.category,
				confirm: o.confirmations,
				txid: o.txid,
				txUrl: `${store.system.url_explorer}/tx/${o.txid}`,
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
		core() {
			return this.$store.state.status.core;
		}
	},

	async asyncData({ params, error, store })
	{
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
			testnet: store.state.system.testnet,
			transactions: [],
			walletStatus: 'Locked',
		};

		try
		{
			const count = store.state.layout.dashboard__count_recent;
			let res = await axios.get(`${store.state.system.url_api}/api/dashboard/?count_recent=${count}`);
			if (res.status !== 200) throw 'API import failed.';
			res = res.data;
			return {
				...result,
				...correction(res, store.state),
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