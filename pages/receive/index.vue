/**
 * Receive
 */
<template>
<article class="contents receive">
	<header class="contents__header">
		<h1>Receive</h1>
	</header>

	<div class="contents__body">
		<nav class="text-right">
			<button type="button">Add address</button>
		</nav>
		<div class="contents__box">
			<div class="table__responsive table__responsive-border">
				<table class="table">
					<thead>
					<tr>
						<th scope="col" width="30%">Label</th>
						<th scope="col">Address</th>
						<th scope="col" width="15%">Amount</th>
						<th scope="col"></th>
					</tr>
					</thead>
					<tbody>
					<tr v-for="o in index">
						<td>
							<strong class="text-brackets-quotes">{{ o.label }}</strong>
						</td>
						<td>{{ o.address }}</td>
						<td class="text-center">{{ o.amount }}</td>
						<td class="text-center">
							<button type="button">Edit</button>
							<button type="button">QR Code</button>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</article>
</template>


<script>
import * as lib from '../../lib';

export default {
	head: {
		title: lib.util.makeTitle('Receive')
	},

	middleware: 'checkCore',

	async asyncData(cox)
	{
		const { params, error, store, $axios } = cox;
		let result = {
			index: [],
		};
		try
		{
			let res = await $axios.$get(`/api/receive`);
			if (!(res.status === 'success' && !!res.data)) throw 'API import failed.';
			return {
				...result,
				index: res.data.index,
			};
		}
		catch(e)
		{
			error({
				statusCode: 400,
				title: 'Receive',
				message: 'Failed to import API',
			});
		}
	}
}
</script>