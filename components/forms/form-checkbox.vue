<template>
	<label
		class="form-checkbox"
		:class="className"
		v-if="!label">
		<input
			type="checkbox"
			:checked="checked"
			:value="value"
			@change="onChange"
		/>
		<i class="form-checkbox__skin"></i>
	</label>
	<label
		class="form-checkbox-label"
		:class="className"
		v-else>
		<span class="form-checkbox">
			<input
				type="checkbox"
				:checked="checked"
				:value="value"
				@change="onChange"
			/>
			<i class="form-checkbox__skin"></i>
			<em>{{ label }}</em>
		</span>
	</label>
</template>


<script>
export default {
	model: {
		prop: 'checked',
		event: 'change'
	},
	props: [
		'label',
		'checked',
		'value',
		'className',
	],
	methods: {
		onChange: function(e)
		{
			this.$emit('change', e.target.checked);
		}
	}
};
</script>