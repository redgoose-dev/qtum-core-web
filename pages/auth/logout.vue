<template></template>

<script>
import axios from 'axios';

export default {
	layout: 'blank',

	async mounted()
	{
		const { $store } = this;

		// check hash
		if (!$store.state.system.hash)
		{
			alert('You are not logged in.');
			location.href = '/';
		}

		let data = JSON.stringify({
			hash: $store.state.system.hash,
		});
		let res = await axios.post(`${$store.state.system.url_api}/api/logout`, data);
		if (res.status === 200 && res.data) res = res.data;

		if (res.status === 'success')
		{
			$store.commit('updateSystem', { hash: null });
			location.href = '/';
		}
	}
}
</script>