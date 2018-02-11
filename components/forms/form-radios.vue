<template>
	<div class="form-checks" :class="className">
		<template v-for="item in items">
			<form-check
				type="radio"
				:name="name"
				:label="item.label"
				:value="item.value"
				:checked="item.value === value"
				@change="onChange"
				:className="classNameItem"
			/>
		</template>
	</div>
</template>

<script>
import FormCheck from '~/components/forms/form-check';

export default {
	components: {
		FormCheck
	},

	props: [
		'items',
		'name',
		'value',
		'change',
		'className',
		'classNameItem',
	],

	model: {
		prop: 'value',
		event: 'change',
	},

	methods: {
		onChange: function(value)
		{
			this.$emit('change', value);
		},
	},
};
</script>