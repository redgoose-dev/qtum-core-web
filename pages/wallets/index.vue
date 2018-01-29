/**
 * Wallets
 */

<template>
<article class="contents wallets">
	<header class="contents__header">
		<h1>Wallets</h1>
	</header>

	<div class="contents__body">
		<ul v-for="key in Object.keys(index).sort()">
			<li>
				<p><strong>"{{ key || `` }}"</strong></p>
				<ul v-for="address in index[key]">
					<li>{{ address }}</li>
				</ul>
			</li>
		</ul>
	</div>
</article>
</template>


<script>
import axios from 'axios';
import * as lib from '~/lib';

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
				index: res.data,
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