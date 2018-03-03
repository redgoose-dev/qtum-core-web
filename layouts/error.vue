<template>
<article class="error">
	<div class="error__wrap" v-if="error.statusCode === 600">
		<h1 class="error_symbol">
			<img src="~static/images/ico-off-core.svg" alt="off core">
		</h1>
		<h2 class="error__heading">The core is now turned off.</h2>
		<p class="error__description">
			To turn on core, please push the following button
		</p>
		<nav class="error__nav">
			<button-basic
				type="submit"
				:label="processing ? 'Processing..' : 'TURN ON CORE'"
				:disabled="processing"
				:loading="processing"
				@click="onTurnOnCore"
				className="button-color-key button-inline"/>
		</nav>
	</div>
	<div class="error__wrap" v-else>
		<h1 class="error__title">Sorry</h1>
		<h2>{{ error.message }}</h2>
		<p class="error__description">
			Go back to <nuxt-link to="/">Home</nuxt-link> or let me know the problem <a href="https://github.com/RedgooseDev/qtum-core-web/issues" target="_blank">here</a>.
		</p>
	</div>
</article>
</template>


<script>
import * as lib from '../lib';
import ButtonBasic from '~/components/button/button-basic';

export default {
	components: {
		ButtonBasic,
	},
	head() {
		const { $store } = this;
		let class_theme = $store.state.layout.theme || lib.constant.theme.light;
		return {
			htmlAttrs: {
				lang: $store.state.system.lang || 'en',
				class: !!class_theme ? `theme-${class_theme}` : null,
			}
		}
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

			this.processing = true;

			let response = await $axios.$post('/api/core-power', {
				hash: $store.state.system.hash,
				power: true,
			});

			switch(response.status)
			{
				case 'success':
					location.reload();
					break;
				default:
					alert('Failed to turn on power.');
					console.error('ERROR:', response);
					this.processing = false;
					break;
			}
		}
	},
	mounted()
	{
		const { $store, $axios } = this;

		// set header in axios
		$axios.setHeader('testnet', $store.state.status.testnet ? 1 : 0);
		$axios.setHeader('language', $store.state.layout.language || 'en');
	},
};
</script>