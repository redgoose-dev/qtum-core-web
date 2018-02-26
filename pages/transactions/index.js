import * as lib from '~/lib';
import ButtonMore from '~/components/button/button-more';


/**
 * get transactions
 *
 * @param {Object} $axios
 * @param {Object} store
 * @param {Number} page
 * @param {Number} size
 * @return {Promise}
 */
async function getTransactions($axios, store, page=1, size=12)
{
	try
	{
		let res = await $axios.$get(`/api/transactions/?page=${page}&size=${size}`);
		let url_explorer = lib.constant.urlExplorer[store.status.testnet ? 'testnet': 'mainnet'];
		if (!(res.status === 'success' && res.data)) throw 'API import failed.';
		return {
			status: 'success',
			data: res.data.map((o, k) => {

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
	}
	catch(e)
	{
		return {
			status: 'error',
			message: e
		};
	}

}


export default {
	head: {
		title: lib.util.makeTitle('Transactions')
	},

	components: {
		ButtonMore
	},

	middleware: 'checkCore',

	methods: {
		more: async function(e)
		{
			this.loading_more = true;
			try
			{
				let transactions = await getTransactions(this.$axios, this.$store.state, this.page + 1, this.size);
				if (transactions.status === 'error') throw transactions.message;
				if (transactions.data && transactions.data.length)
				{
					this.transactions = [
						...this.transactions,
						...transactions.data
					];
					this.page += 1;
				}
				if (transactions.data && transactions.data.length < this.size)
				{
					this.noMore = true;
				}
			}
			catch(e)
			{
				console.error('ERROR MORE', e);
			}
			this.loading_more = false;
		}
	},

	async asyncData(cox)
	{
		const { error, store } = cox;
		let result = {
			page: 1,
			size: store.state.layout.count__transactions,
			loading_more: false,
			noMore: false,
			transactions: [],
		};
		try
		{
			let transactions = await getTransactions(cox.$axios, store.state, 1, result.size);
			if (transactions.status === 'error') throw transactions.message;
			return {
				...result,
				transactions: transactions.data,
				noMore: (transactions.data && transactions.data.length < result.size),
			};
		}
		catch(e)
		{
			error({
				statusCode: 400,
				title: 'Transactions',
				message: 'Failed to import API',
			});
		}
	},
}