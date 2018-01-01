<template>
	<main>
		<h1>[{{ error.statusCode}}] Error page</h1>
		<p>{{ error.message }}</p>
	</main>
</template>


<script>
export default {
	props: ['error'],
};
</script>