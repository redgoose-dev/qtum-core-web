<template>
<article class="error">
	<div class="error__wrap" v-if="error.statusCode === 600">
		<h1>
			<img src="~static/images/ico-off-core.svg" alt="off core">
		</h1>
		<h2>The core is now turned off.</h2>
		<p>To turn on core, please push the following button</p>
		<nav>
			<button-basic
				type="submit"
				:label="processing ? 'Processing..' : 'TURN ON CORE'"
				:disabled="processing"
				@click="onTurnOnCore"
				className="button-key button-inline"/>
		</nav>
	</div>
	<div class="error__wrap" v-else>
		<h1>Sorry</h1>
		<h2>{{ error.message }}</h2>
		<p>
			Go back to <nuxt-link to="/">Home</nuxt-link> or let me know the problem <a href="https://github.com/RedgooseDev/qtum-core-web/issues" target="_blank">here</a>.
		</p>
	</div>
</article>
</template>


<script>
import * as lib from '~/lib';
import ButtonBasic from '~/components/button/button-basic';

export default {
	components: {
		ButtonBasic,
	},
	props: ['error'],
	data(cox)
	{
		return {
			processing: false,
		};
	},
	methods: {
		onTurnOnCore: async function ()
		{
			const { $store, $axios } = this;

			let response = await $axios.$post('/api/core-power', {
				hash: $store.state.system.hash,
				power: true,
			});

			switch(response.status)
			{
				case 'success':
					await lib.util.sleep(1000);
					alert('Turn on qtum-core');
					// TODO: 새로고침하는것으로는 소용이 없고 직접 스토어를 업데이트 해줘야할거 같다...
					break;
				default:
					console.error('error on core', response);
					break;
			}
		}
	},
};
</script>