/**
 * Transactions
 */

<template>
<article class="contents transactions">
	<header class="contents__header transactions__header">
		<h1>Transactions</h1>
	</header>

	<div class="contents__body">
		<form action="#" method="get" class="search" style="display: none;">
			<fieldset>
				<legend class="blind">filter and search form</legend>
				<div>

				</div>
			</fieldset>
		</form>

		<div class="contents__box">
			<table class="table table-fixed table-border">
				<thead>
				<tr>
					<th scope="col" width="140">Date</th>
					<th scope="col" width="100">Type</th>
					<th scope="col">Transaction ID</th>
					<th scope="col" width="120">Amount</th>
					<th scope="col" width="100">Fee</th>
					<th scope="col" width="100">Confirm</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="o in transactions">
					<td class="text-center">{{ o.time }}</td>
					<td class="text-center">{{ o.type }}</td>
					<td class="text-center">
						<a v-bind:href="o.txUrl" target="_blank">{{ o.txid }}</a>
					</td>
					<td class="text-center">{{ o.amount }}</td>
					<td class="text-center">{{ o.fee }}</td>
					<td class="text-center">{{ o.confirm }}</td>
				</tr>
				</tbody>
			</table>
		</div>

		<nav v-if="!noMore">
			<button type="button" v-if="!loading_more" v-on:click="more">
				<span>more..</span>
			</button>
			<div v-else>
				<p>LOADING...</p>
			</div>
		</nav>
	</div>
</article>
</template>


<script>
import axios from 'axios';
import moment from 'moment';
import * as lib from '~/lib';

const SIZE = 20;


/**
 * correction datas
 *
 * @param {Object} src
 * @param {Object} store
 * @return {Object}
 */
function correction(src, store)
{
	return {
		transactions: src.map((o, k) => {
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

	methods: {
		more: async function(e)
		{
			this.loading_more = true;
			try
			{
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
}
</script>