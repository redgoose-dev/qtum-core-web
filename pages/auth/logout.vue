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

			// clear storage
			if (window.localStorage && window.sessionStorage)
			{
				window.localStorage.removeItem('hash');
				window.localStorage.removeItem('testnet');
				window.sessionStorage.removeItem('hash');
				window.sessionStorage.removeItem('testnet');
			}

			// request api
			let res = await $axios.$post(`/api/logout`, data);

			if (res.status === 'success')
			{
				$store.commit('updateSystem', { hash: null });
				location.href = '/';
			}
			else
			{
				throw 'error';
			}
		}
		catch(e)
		{
			alert($lang.out('message.failedLogout'));
			location.href = '/';
		}
	}
}
</script>