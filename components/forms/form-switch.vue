<template>
	<button
		:title="title"
		class="form-switch"
		@click="onChange"
		:class="className">
		<i class="form-switch__icon" :class="statusClassName">
			{{value}}
		</i>
	</button>
</template>

<script>
export default {
	props: [
		'title',
		'name',
		'value',
		'change',
		'className',
	],

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