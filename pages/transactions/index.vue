<template>
	<div>
		<h1>Transactions page</h1>
		<nav>
			<button type="button" v-on:click="back">back</button>
		</nav>
	</div>
</template>


<script>
import * as lib from '~/lib';

export default {
	head: {
		title: lib.util.makeTitle('Transactions')
	},
	middleware: 'transactions',
	methods: {
		back: function(e)
		{
			this.$router.go(-1);
		}
	},
}
</script>