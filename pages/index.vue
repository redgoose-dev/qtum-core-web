<template>
<article class="contents dashboard">
	<header class="contents-header dashboard__header">
		<h1>Dashboard</h1>
	</header>

	<div class="dashboard__body">
		<div class="row">
			<div class="col">
				<article class="section section-balance">
					<header class="section__head">
						<h1>Balance</h1>
					</header>
					<div class="section__body">
						<dl class="description">
							<dt>Available</dt>
							<dd><strong>0.0000</strong></dd>
						</dl>
						<dl class="description">
							<dt>Pending</dt>
							<dd><strong>0.0000</strong></dd>
						</dl>
						<dl class="description">
							<dt>Immature</dt>
							<dd><strong>0.0000</strong></dd>
						</dl>
						<dl class="description">
							<dt>Staked</dt>
							<dd><strong>0.0000</strong></dd>
						</dl>
						<dl class="description description-large" style="margin-top: 20px">
							<dt><strong>Total</strong></dt>
							<dd class="size-large"><strong class="text-key">0000.000000 QTUM</strong></dd>
						</dl>
					</div>
				</article>
			</div>
			<div class="col">
				<article class="section section-status">
					<header class="section__head">
						<h1>Status</h1>
					</header>
					<div class="section__body">
						<dl class="description">
							<dt>Version</dt>
							<dd><strong>{{ version }}</strong></dd>
						</dl>
						<dl class="description">
							<dt>Current block</dt>
							<dd><strong>8354</strong></dd>
						</dl>
						<dl class="description">
							<dt>Staking</dt>
							<dd><strong class="text-success">true</strong></dd>
						</dl>
						<dl class="description">
							<dt>Wallet status</dt>
							<dd><strong>dfmgip</strong></dd>
						</dl>
						<dl class="description">
							<dt>Wallet weight</dt>
							<dd><strong>345345</strong></dd>
						</dl>
						<dl class="description">
							<dt>Network weight</dt>
							<dd><strong>348590</strong></dd>
						</dl>
						<dl class="description">
							<dt>Connections</dt>
							<dd><strong>8</strong></dd>
						</dl>
					</div>
				</article>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<article class="section section-transactions">
					<header class="section__head">
						<h1>Recent transactions</h1>
						<nav>
							<nuxt-link to="/transactions" title="More transactions">
								<i class="sp-ico ico-more2"></i>
							</nuxt-link>
						</nav>
					</header>
					<div class="section__body">
						<table class="table">
							<thead>
							<tr>
								<th scope="col" width="150">Date</th>
								<th scope="col" width="">Type</th>
								<th scope="col">Transaction ID</th>
								<th scope="col" width="">Amount</th>
								<th scope="col" width="">Fee</th>
								<th scope="col" width="">Confirm</th>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td class="text-center">0000-00-00 00:00</td>
								<td class="text-center">Send</td>
								<td class="text-center"><a href="#">digdfig54nodfgdgdip</a></td>
								<td class="text-center">0.000000</td>
								<td class="text-center">0.0000</td>
								<td class="text-center">12345</td>
							</tr>
							<tr>
								<td class="text-center">0000-00-00 00:00</td>
								<td class="text-center">Send</td>
								<td class="text-center"><a href="#">digdfig54nodfgdgdip</a></td>
								<td class="text-center">0.000000</td>
								<td class="text-center">0.0000</td>
								<td class="text-center">12345</td>
							</tr>
							<tr>
								<td class="text-center">0000-00-00 00:00</td>
								<td class="text-center">Send</td>
								<td class="text-center"><a href="#">digdfig54nodfgdgdip</a></td>
								<td class="text-center">0.000000</td>
								<td class="text-center">0.0000</td>
								<td class="text-center">12345</td>
							</tr>
							<tr>
								<td class="text-center">0000-00-00 00:00</td>
								<td class="text-center">Send</td>
								<td class="text-center"><a href="#">digdfig54nodfgdgdip</a></td>
								<td class="text-center">0.000000</td>
								<td class="text-center">0.0000</td>
								<td class="text-center">12345</td>
							</tr>
							</tbody>
						</table>
					</div>
				</article>
			</div>
		</div>
	</div>
</article>
</template>


<script>
import axios from 'axios';
import * as lib from '../lib';

export default {

	async asyncData({ params, error, store })
	{
		let result = {};
		try {
			result = await axios.get(`${process.env.pref.BASE_URL}/api/dashboard`);

			// TODO: API 작업이 완료되면 값 붙이기.
			console.log(result.data);

			if (result.status !== 200 || result.data.status !== 'success') throw 'API import failed.';
			result = result.data.data;

			// update store
			//store.commit('updateBalance', result.balance);
		} catch(e) {
			// error({
			// 	statusCode: 404,
			// 	message: e
			// });
		}

		return {
			status: 'success',
			version: result.version || 0,
		};
	},

	// async fetch({}) {},

	//middleware: 'intro',

	mounted() {
		console.warn('Mounted dashboard component');
	},
}
</script>
