<template>
<article class="error">
	<div class="error__wrap">
		<h1>Sorry</h1>
		<h2>
			{{ error.message }}
		</h2>
		<p>
			Go back to <nuxt-link to="/">Home</nuxt-link> or let me know the problem <a href="https://github.com/RedgooseDev/qtum-core-web/issues" target="_blank">here</a>.
		</p>
	</div>
</article>
</template>


<script>
export default {
	props: ['error'],
};
</script>