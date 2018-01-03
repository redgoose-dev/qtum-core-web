<template>
	<main>
		<h1>login page</h1>
		<nav>
			<button type="button" v-on:click="back">back</button>
		</nav>
	</main>
</template>


<script>
import * as lib from '../../lib';

export default {
	layout: 'blank',
	head: {
		title: lib.util.makeTitle('login')
	},
	middleware: 'login',
	methods: {
		back: function(e)
		{
			this.$router.go(-1);
		}
	},
}
</script>
