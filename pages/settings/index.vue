<template>
<article class="contents settings">
	<header class="contents__header settings__header">
		<h1>Settings</h1>
	</header>

	<div class="contents__body">
		<p>
			// TODO: settings form
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
		title: lib.util.makeTitle('Settings')
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