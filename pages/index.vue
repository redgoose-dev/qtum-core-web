<template>
	<div class="container">
		<h2>dashboard component</h2>
		<p>{{ foo }}</p>
		<nav>
			<ul>
				<li><nuxt-link to="/">intro</nuxt-link></li>
				<li><nuxt-link to="/transactions">transactions</nuxt-link></li>
				<li><nuxt-link to="/login">login</nuxt-link></li>
			</ul>
		</nav>
	</div>
</template>


<script>
import axios from 'axios';
import * as modules from '../modules';
import * as lib from '../lib';

export default {

	async asyncData(context)
	{
		return { foo: 'bar' };
	},

	//middleware: 'intro',

	// mounted() {
	// 	console.log('mounted dashboard component');
	// },
}
</script>
