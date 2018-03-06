<template></template>

<script>
export default {
	layout: 'blank',

	async mounted()
	{
		const { $store, $axios, $lang } = this;

		// check hash
		if (!$store.state.system.hash)
		{
			alert($lang.out('message.logined'));
			location.href = '/';
		}

		try
		{
			let data = {
				hash: $store.state.system.hash,
				testnet: $store.state.status.testnet,
			};

			// request api
			let res = await $axios.$post(`/api/logout`, data);

			if (res.status === 'success')
			{
				$store.commit('updateSystem', { hash: null });
				location.href = '/';
			}
		}
		catch(e)
		{
			alert($lang.out('message.failedLogout'));
			this.$router.back();
		}
	}
}
</script>