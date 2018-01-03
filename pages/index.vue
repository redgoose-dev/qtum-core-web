<template>
	<dashboard/>
</template>


<script>
import Dashboard from '~/components/Dashboard/index.vue';

export default {
	components: {
		Dashboard
	},

	layout: 'basic',

	async asyncData({ params }) {
		let aa = 1;
		let bb = 2;
		return { foo: 'bar', asd: aa + bb };
	},
}
</script>
