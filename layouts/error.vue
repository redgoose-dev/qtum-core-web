<template>
	<article>
		<h1>[{{ error.statusCode}}] Error page</h1>
		<p>{{ error.message }}</p>
	</article>
</template>


<script>
export default {
	props: ['error'],
};
</script>