<template>
<span class="form-text" :class="className">
	<input
		:type="type"
		:name="name"
		:id="id"
		:placeholder="placeholder"
		:value="value"
		:size="size"
		:maxlength="maxlength"
		:required="required"
		:disabled="disabled"
		@input="changeText"
		class="form-text__input"
		:class="classNameInput"
	/>
</span>
</template>

<script>
export default {
	props: {
		type: { type: String, default: 'text' },
		name: { type: String, default: null },
		id: { type: String, default: null },
		value: { type: [String,Number], default: null },
		placeholder: { type: String, default: null },
		size: {},
		maxlength: {},
		required: { type: Boolean, default: false },
		disabled: { type: Boolean, default: false },
		className: { type: String },
		classNameInput: { type: String },
	},

	model: {
		prop: 'value',
		event: 'change',
	},

	methods: {
		changeText: function(e)
		{
			this.$emit('change', e.target.value);
		}
	},
}
</script>