<template>
<article class="contents unlockWallet">
	<header class="contents__header">
		<h1>Unlock wallet</h1>
	</header>
	<div class="contents__body">
		.contents
	</div>
</article>
</template>


<script>
import * as lib from '~/lib';

export default {
	head: {
		title: lib.util.makeTitle('unlock wallet')
	},

	middleware: 'checkCore',
}
</script>