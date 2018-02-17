<template>
	<button
		:type="type"
		:class="[
			'button',
			loading && 'button-loading',
			className
		]"
		@click="onClick"
		:disabled="disabled"
		v-if="type === 'button' || type === 'submit'">
		<span>{{ label }}</span>
		<loading-mini color="white" class="button__loader" v-if="loading"/>
	</button>
	<a
		:href="href"
		:target="target"
		@click="onClick"
		v-else>
		<span>{{ label }}</span>
	</a>
</template>

<script>
import LoadingMini from '~/components/loading/loading-mini';

export default {
	components: {
		LoadingMini,
	},
	props: {
		type: {},
		href: {},
		target: {},
		label: {},
		disabled: { type: Boolean, default: false },
		loading: { type: Boolean, default: false },
		className: {},
	},
	methods: {
		onClick: function(e)
		{
			this.$emit('click', e);
		}
	},
};
</script>