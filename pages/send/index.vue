<template>
<article class="contents send">
	<header class="contents__header send__header">
		<h1>Send qtum</h1>
	</header>

	<div class="contents__body">
		<p>
			// TODO: send qtum form
		</p>

		<nav>
			<button type="button" v-on:click="back">back</button>
		</nav>
	</div>
</article>
</template>


<script>
import * as lib from '~/lib';

export default {
	head: {
		title: lib.util.makeTitle('Send')
	},

	middleware: 'checkCore',

	methods: {
		back: function(e)
		{
			this.$router.go(-1);
		}
	},
}
</script>