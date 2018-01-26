/**
 * Wallets
 */

<template>
<article class="contents wallets">
	<header class="contents__header">
		<h1>Wallets</h1>
	</header>

	<div class="contents__body">
		<!--<ul v-for="o in index">-->
			<!--<li>{{ o }}</li>-->
		<!--</ul>-->
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

			// result = {
			// 	...result,
			// 	index: lib.object.treeToList(res.data),
			// };

			return result;
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