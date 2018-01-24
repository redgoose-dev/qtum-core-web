<template>
<nav class="more-article" v-if="show">
	<button
		type="button"
		:class="[ 'buttonMore', !!loading && 'buttonMore-loading' ]"
		@click="onClick">
		<i>more load article</i>
	</button>
</nav>
</template>


<script>
export default {
	props: {
		show: { type: Boolean, default: false },
		loading: { type: Boolean, default: false },
	},
	methods: {
		onClick: function(e)
		{
			this.$emit('click', e);
		}
	}
};
</script>