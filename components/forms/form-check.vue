<template>
	<label
		:class="[`form-${typeName}`, className]"
		v-if="!label">
		<input
			:type="typeName"
			:name="name"
			:value="value"
			:checked="checked"
			@change="onChange"/>
		<i :class="`form-${typeName}__skin`"></i>
	</label>
	<label
		:class="[`form-${typeName}-label`, className]"
		v-else>
		<span :class="`form-${typeName}`">
			<input
				:type="typeName"
				:name="name"
				:value="value"
				:checked="checked"
				@change="onChange"/>
			<i :class="`form-${typeName}__skin`"></i>
		</span>
		<em :class="`form-${typeName}__label`">{{ label }}</em>
	</label>
</template>


<script>
export default {
	props: [
		'label',
		'type',
		'name',
		'value',
		'checked',
		'change',
		'className',
	],

	model: {
		prop: 'checked',
		event: 'change'
	},

	data(cox) {
		const { type } = cox;
		return {
			typeName: type === 'radio' ? 'radio' : 'checkbox',
		}
	},

	methods: {
		onChange: function(e)
		{
			this.$emit('change', !!this.value ? e.target.value : e.target.checked);
		}
	},
};
</script>