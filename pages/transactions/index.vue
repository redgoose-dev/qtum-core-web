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
	</div>
</article>
</template>


<script>
import axios from 'axios';
import moment from 'moment';
import * as lib from '~/lib';

function correction(src)
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
				txUrl: `${process.env.pref.EXPLORER_URL}/tx/${o.txid}`,
			};
		})
	};
}

export default {
	head: {
		title: lib.util.makeTitle('Transactions')
	},
	async asyncData({ params, error, store })
	{
		let result = {};
		try
		{
			result = await axios.get(`${process.env.pref.API_URL}/api/transactions`);
			if (result.status !== 200) throw 'API import failed.';
			result = result.data;
			if (!(result.status === 'success' && !!result.data)) throw 'Not found response data';
			return correction(result.data);
		}
		catch(e)
		{
			error({
				statusCode: 400,
				message: e
			});
		}
	},
	methods: {},
}
</script>