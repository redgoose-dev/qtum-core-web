<template>
	<main>
		<h1>layout</h1>
		<hr>
		<nuxt/>
	</main>
</template>

<script>
export default {
	middleware: 'checkAuth',
}
</script>