import axios from 'axios';
import moment from 'moment';
import * as lib from '~/lib';
import ButtonMore from '~/components/button/button-more';


const SIZE = 12;


/**
 * get transactions
 *
 * @param {Object} store
 * @param {Number} page
 * @param {Number} size
 * @return {Promise}
 */
async function getTransactions(store, page=1, size=SIZE)
{
	try
	{
		let res = await axios.get(`${store.system.url_api}/api/transactions/?page=${page}&size=${size}`);
		if (res.status !== 200) throw 'API import failed.';
		res = res.data;
		if (!(res.status === 'success' && !!res.data)) throw 'Not found response data';
		return {
			status: 'success',
			data: res.data.map((o, k) => {
				return {
					address: o.address,
					amount: o.amount.toFixed(6),
					time: moment.unix(o.time).format('YYYY-MM-DD HH:mm'),
					type: o.category,
					confirm: o.confirmations,
					txid: o.txid,
					fee: o.fee || 0,
					txUrl: `${store.system.url_explorer}/tx/${o.txid}`,
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

	methods: {
		more: async function(e)
		{
			console.log('call more');
			this.loading_more = true;
			try
			{
				await lib.util.sleep(3000); // TODO : 로딩중임을 확인하기 위한 딜레이
				let transactions = await getTransactions(this.$store.state, this.page + 1);
				if (transactions.status === 'error') throw transactions.message;
				if (transactions.data && transactions.data.length)
				{
					this.transactions = [
						...this.transactions,
						...transactions.data
					];
					this.page += 1;
				}
				if (transactions.data && transactions.data.length < SIZE)
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

	async asyncData({ params, error, store })
	{
		let result = {
			page: 1,
			loading_more: false,
			noMore: false,
			transactions: [],
		};
		try
		{
			let transactions = await getTransactions(store.state);
			if (transactions.status === 'error') throw transactions.message;
			return {
				...result,
				transactions: transactions.data,
				noMore: (transactions.data && transactions.data.length < SIZE),
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