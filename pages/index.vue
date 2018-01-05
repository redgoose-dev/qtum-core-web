<template>
	<div class="container">
		<h2>dashboard component</h2>
		<p>version: {{ version }}</p>
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
import * as lib from '../lib';

export default {

	async asyncData({ params, error, store })
	{
		let result = null;
		try {
			result = await axios.get(`${process.env.config.BASE_URL}/api`);
			if (result.status !== 200 || result.data.status !== 'success') throw 'Server error';
			result = result.data.data;

			// update store
			store.commit('updateBalance', result.balance);

			return {
				status: 'success',
				version: result.version,
			};
		} catch(e) {
			error({
				statusCode: 404,
				message: `API import failed.`
			});
		}
	},

	// async fetch({}) {},

	//middleware: 'intro',

	mounted() {},
}
</script>
