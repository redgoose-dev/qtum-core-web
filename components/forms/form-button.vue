<template>
	<button
		:type="type"
		@click="onClick"
		v-if="type === 'button' || type === 'submit'">
		{{ label }}
	</button>
	<a
		:href="href"
		:target="target"
		@click="onClick"
		v-else>
		{{ label }}
	</a>
</template>

<script>
export default {
	props: [
		'type',
		'href',
		'target',
		'label',
	],
	methods: {
		onClick: function(e)
		{
			this.$emit('click', e);
		}
	},
};
</script>