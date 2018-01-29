<template>
</template>


<script>
import axios from 'axios';
import * as lib from '~/lib';

export default {
	layout: 'blank',

	async asyncData(cox) {
		const { redirect, store } = cox;

		// check hash
		if (!store.state.system.hash)
		{
			console.error('You are not logged in.');
			redirect('/');
		}

		let data = JSON.stringify({
			hash: store.state.system.hash,
		});
		let res = await axios.post(`${store.state.system.url_api}/api/logout`, data);
		if (res.status === 200 && res.data) res = res.data;

		//console.log(res);
		if (res.status === 'success')
		{
			store.commit('updateSystem', { hash: null });
			redirect('/');
		}
	}
}
</script>