/**
 * Wallets
 */

<template>
<article class="contents wallets">
	<header class="contents__header">
		<h1>Wallets</h1>
	</header>

	<div class="contents__body">
		<div class="contents__box">
			<div class="table__responsive table__responsive-border">
				<table class="table">
					<thead>
					<tr>
						<th scope="col">Label</th>
						<th scope="col">Address</th>
					</tr>
					</thead>
					<tbody>
					<tr v-for="o in index">
						<td>
							<strong class="text-brackets-quotes">{{ o.key }}</strong>
						</td>
						<td>{{ o.address }}</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</article>
</template>


<script>
import axios from 'axios';
import * as lib from '../../lib';

export default {
	head: {
		title: lib.util.makeTitle('Wallets')
	},

	async asyncData({ params, error, store })
	{
		let result = {};
		try
		{
			let res = await axios.get(`${store.state.system.url_api}/api/wallets/`);
			if (res.status !== 200) throw 'API import failed.';
			res = res.data;
			if (!(res.status === 'success' && !!res.data)) throw 'Not found response data';

			return {
				...result,
				index: lib.object.treeToList(res.data, 'key', 'address', true),
			};
		}
		catch(e)
		{
			error({
				statusCode: 400,
				title: 'Wallets',
				message: 'Failed to import API',
			});
		}
	}
}
</script>