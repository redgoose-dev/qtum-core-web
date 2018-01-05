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
		// TODO: .env파일을 이용하여 api 주소 만들기
		//console.log();
		// try {
		// 	let result = await axios.get(`http://localhost/api`);
		// 	console.log(result.data);
		// } catch(e) {
		// 	console.error(e);
		// }
		return { foo: 'bar' };
	},

	// async fetch({}) {},

	//middleware: 'intro',

	async mounted() {
		// console.log('mounted dashboard component');
		// console.log('qwe');

		return { foo: 'bareeeeeeee' };
	},
}
</script>
