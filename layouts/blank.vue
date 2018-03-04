<template>
<nuxt/>
</template>

<script>
import * as lib from '../lib';

export default {
	head() {
		const { $store } = this;
		let class_theme = $store.state.layout.theme || lib.constant.theme.light;
		return {
			htmlAttrs: {
				lang: $store.state.layout.language || 'en',
				class: !!class_theme ? `theme-${class_theme}` : null,
			}
		}
	},
	beforeMount: function()
	{
		lib.util.setBeforeLayout(this);
	},
}
</script>