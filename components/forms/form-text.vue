<template>
	<span>
		<strong>{{ message }}</strong><br/>
		<input
			type="text"
			placeholder="dsnfgoisdngmpksdg"
			v-model="message"
		>
	</span>
</template>


<script>
export default {
	props: [
		'message'
	],
	model: {
		prop: 'message'
	},
	// methods: {
	// 	updateValue: function(value)
	// 	{
	// 		this.$emit('update', `::${value}`);
	// 	}
	// },
}
</script>