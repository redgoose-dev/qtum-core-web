<template>
	<main>
		<nuxt/>
	</main>
</template>


<script>
export default {
	middleware: 'checkAuth',
}
</script>