<template>
<article class="error">
	<div class="error__wrap" v-if="error.statusCode === 600">
		<h1>
			<img src="~static/images/ico-off-core.svg" alt="off core">
		</h1>
		<h2>The core is now turned off.</h2>
		<p>To turn on core, please push the following button</p>
		<nav>
			<button-basic
				type="submit"
				:label="processing ? 'Processing..' : 'TURN ON CORE'"
				:disabled="processing"
				className="button-key button-inline"/>
		</nav>
	</div>
	<div class="error__wrap" v-else>
		<h1>Sorry</h1>
		<h2>{{ error.message }}</h2>
		<p>
			Go back to <nuxt-link to="/">Home</nuxt-link> or let me know the problem <a href="https://github.com/RedgooseDev/qtum-core-web/issues" target="_blank">here</a>.
		</p>
	</div>
</article>
</template>


<script>
import ButtonBasic from '~/components/button/button-basic';

export default {
	components: {
		ButtonBasic,
	},
	props: ['error'],
	data(cox)
	{
		return {
			processing: false,
		};
	}
};
</script>