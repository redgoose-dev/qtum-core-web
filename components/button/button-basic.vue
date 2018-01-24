<template>
	<button
		:type="type"
		:class="[ 'button', className ]"
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
	//form-button-key
export default {
	props: [
		'type',
		'href',
		'target',
		'label',
		'className'
	],
	methods: {
		onClick: function(e)
		{
			this.$emit('click', e);
		}
	},
};
</script>