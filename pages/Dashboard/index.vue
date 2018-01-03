<template>
	<Dashboard/>
</template>


<script>
import Dashboard from '~/components/Dashboard';
import * as lib from '~/lib';

export default {
	components: {
		Dashboard
	},

	layout: 'basic',

	head: {
		title: lib.util.makeTitle('dashboard')
	},
}
</script>