<template>
<main>
	<header>
		<p>
			.header
		</p>
		<p>
			current: {{ balance }}
		</p>

	</header>
	<nuxt/>
</main>
</template>


<script>
export default {
	computed: {
		balance() {
			return this.$store.state.balance.toFixed(8);
		}
	},
	data() {
		return {
			foo: 'barrrr'
		}
	}
}
</script>