<template></template>

<script>
export default {
	layout: 'blank',

	async mounted()
	{
		const { $store, $axios } = this;

		// check hash
		if (!$store.state.system.hash)
		{
			alert('You are not logged in.');
			location.href = '/';
		}

		let data = {
			hash: $store.state.system.hash,
		};

		// request api
		let res = await $axios.$post(`/api/logout`, data);

		if (res.status === 'success')
		{
			$store.commit('updateSystem', { hash: null });
			location.href = '/';
		}
	}
}
</script>