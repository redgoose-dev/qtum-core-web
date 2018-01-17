/**
 * Dashboard
 */
<template>
<article class="contents dashboard">
	<header class="contents__header dashboard__header">
		<h1>Dashboard</h1>
	</header>

	<div class="contents__body">
		<div class="row">
			<div class="col">
				<article class="section section-balance">
					<header class="section__head">
						<h1>Balance</h1>
					</header>
					<div class="section__body">
						<dl class="description">
							<dt>Staked</dt>
							<dd><strong>{{ stake }}</strong></dd>
						</dl>
						<dl class="description description-large">
							<dt><strong>Balance</strong></dt>
							<dd class="size-large"><strong class="text-key">{{ balance }} QTUM</strong></dd>
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
							<dd><strong>{{ blocks }}</strong></dd>
						</dl>
						<dl class="description">
							<dt>Staking</dt>
							<dd><strong v-bind:class="staking ? 'text-success' : 'text-error'">{{ staking }}</strong></dd>
						</dl>
						<dl class="description">
							<dt>Wallet status</dt>
							<dd><strong>{{ walletStatus }}</strong></dd>
						</dl>
						<dl class="description">
							<dt>Network weight</dt>
							<dd><strong>{{ networkWeight }}</strong></dd>
						</dl>
						<dl class="description">
							<dt>Connections</dt>
							<dd><strong>{{ connections }}</strong></dd>
						</dl>
						<dl class="description">
							<dt>Testnet</dt>
							<dd><strong>{{ testnet }}</strong></dd>
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
						<table class="table table-fixed">
							<thead class="not-bg">
							<tr>
								<th scope="col" width="140">Date</th>
								<th scope="col" width="100">Type</th>
								<th scope="col">Transaction ID</th>
								<th scope="col" width="120">Amount</th>
								<th scope="col" width="90">Confirm</th>
							</tr>
							</thead>
							<tbody>
							<tr v-for="o in transactions">
								<td class="text-center">{{ o.time }}</td>
								<td class="text-center">{{ o.type }}</td>
								<td class="text-center">
									<a v-bind:href="o.txUrl" target="_blank">{{ o.txid }}</a>
								</td>
								<td class="text-center">{{ o.amount }}</td>
								<td class="text-center">{{ o.confirm }}</td>
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


<script src="./index.js"></script>