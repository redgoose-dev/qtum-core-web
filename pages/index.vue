<template>
<article class="contents dashboard">
	<header class="contents-header dashboard__header">
		<h1>Dashboard</h1>
	</header>

	<div class="dashboard__body">
		<div class="row">
			<div class="col">
				<article class="section dashboard__box-balance">
					<header class="section__head">
						<h1>Balance</h1>
					</header>
					<div class="section__body">
						.body
					</div>
				</article>
			</div>
		</div>
	</div>

	<p>version: {{ version }}</p>

	<nav>
		<ul>
			<li><nuxt-link to="/">intro</nuxt-link></li>
			<li><nuxt-link to="/transactions">transactions</nuxt-link></li>
			<li><nuxt-link to="/login">login</nuxt-link></li>
		</ul>
	</nav>
</article>
</template>


<script>
import axios from 'axios';
import * as lib from '../lib';

export default {

	async asyncData({ params, error, store })
	{
		let result = null;
		try {
			result = await axios.get(`${process.env.pref.BASE_URL}/api`);
			if (result.status !== 200 || result.data.status !== 'success') throw 'Server error';
			result = result.data.data;

			// update store
			//store.commit('updateBalance', result.balance);

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
