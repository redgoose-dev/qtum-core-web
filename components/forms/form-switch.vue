<template>
	<button
		:title="title"
		:disabled="disabled"
		class="form-switch"
		:class="className"
		@click="onChange">
		<i class="form-switch__icon" :class="statusClassName">
			{{value}}
		</i>
	</button>
</template>

<script>
export default {
	props: {
		title: { default: 'switch' },
		disabled: { default: false },
		value: {},
		change: { default: false },
		className: {},
	},
	model: {
		prop: 'value',
		event: 'change'
	},
	computed: {
		statusClassName: function()
		{
			return {
				'form-switch__icon-on': !!this.value,
			};
		}
	},
	methods: {
		onChange: function(e)
		{
			this.$emit('change', !this.value);
		}
	},
};
</script>