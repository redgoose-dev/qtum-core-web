<template>
<article class="contents dashboard">
	<header class="contents__header dashboard__header">
		<h1>{{$lang.out('dashboard.title')}}</h1>
	</header>

	<div class="contents__body">
		<div class="row">
			<div class="col">
				<article class="section section-balance">
					<header class="section__head">
						<h1>{{$lang.out('global.balance')}}</h1>
					</header>
					<div class="section__body">
						<dl class="description">
							<dt><strong>{{$lang.out('dashboard.totalBalance')}}</strong></dt>
							<dd class="size-large"><strong class="text-key">{{ balance }} QTUM</strong></dd>
						</dl>
						<dl class="description" v-if="stake > 0">
							<dt>{{$lang.out('dashboard.staked')}}</dt>
							<dd><strong>{{ stake }}</strong></dd>
						</dl>
						<dl class="description" v-if="immature_balance > 0">
							<dt>{{$lang.out('dashboard.immature')}}</dt>
							<dd><strong>{{ immature_balance }}</strong></dd>
						</dl>
						<dl class="description" v-if="unconfirmed_balance > 0">
							<dt>{{$lang.out('dashboard.unconfirmed')}}</dt>
							<dd><strong>{{ unconfirmed_balance }}</strong></dd>
						</dl>
					</div>
				</article>
			</div>
			<div class="col">
				<article class="section section-status">
					<header class="section__head">
						<h1>{{$lang.out('global.status')}}</h1>
					</header>
					<div class="section__body">
						<dl class="description">
							<dt>{{$lang.out('global.version')}}</dt>
							<dd><strong>v{{ version }}</strong></dd>
						</dl>
						<dl class="description">
							<dt>{{$lang.out('dashboard.currentBlock')}}</dt>
							<dd><strong>{{ blocks }}</strong></dd>
						</dl>
						<dl class="description">
							<dt>{{$lang.out('dashboard.staking')}}</dt>
							<dd><strong v-bind:class="staking ? 'text-success' : 'text-error'">{{ staking }}</strong></dd>
						</dl>
						<dl class="description">
							<dt>{{$lang.out('dashboard.walletStatus')}}</dt>
							<dd><strong>{{ walletStatus }}</strong></dd>
						</dl>
						<dl class="description">
							<dt>{{$lang.out('dashboard.networkWeight')}}</dt>
							<dd><strong>{{ networkWeight }}</strong></dd>
						</dl>
						<dl class="description">
							<dt>{{$lang.out('dashboard.connections')}}</dt>
							<dd><strong>{{ connections }}</strong></dd>
						</dl>
						<dl class="description" v-if="testnet">
							<dt>{{$lang.out('global.testnet')}}</dt>
							<dd><strong>true</strong></dd>
						</dl>
					</div>
				</article>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<article class="section section-transactions">
					<header class="section__head">
						<h1>{{$lang.out('dashboard.recentTransactions')}}</h1>
						<nav>
							<nuxt-link to="/transactions" title="More transactions">
								<i class="sp-ico ico-more-active"></i>
							</nuxt-link>
						</nav>
					</header>
					<div class="section__body">
						<ul class="index" v-if="transactions.length">
							<li v-for="o in transactions" class="index__item index__item-row">
								<div class="index__col index__col-flex index__col-body index__col-overflow">
									<p class="index__metas">
										<span>
											<b>{{$lang.out('global.date')}}</b>
											<em>{{ o.time }}</em>
										</span>
										<span>
											<b>{{$lang.out('global.amount')}}</b>
											<em>{{ o.amount }}</em>
										</span>
										<span v-if="!!o.fee">
											<b>{{$lang.out('global.fee')}}</b>
											<em>{{ o.fee }}</em>
										</span>
										<span>
											<b>{{$lang.out('global.confirm')}}</b>
											<em>{{ o.confirm }}</em>
										</span>
									</p>
									<p class="index__description index__description-nowrap">
										{{$lang.out('global.transactionId')}}: <a v-bind:href="o.txUrl" target="_blank">{{ o.txid }}</a>
									</p>
								</div>
								<div class="index__col index__col-type">
									<p :class="[
										'index__type',
										o.type === 'send' && 'text-error',
										o.type === 'receive' && 'text-success'
									]">
										{{$lang.out(`global.${o.type}`)}}
									</p>
								</div>
							</li>
						</ul>
						<p class="empty-index" v-else>Not found item</p>
					</div>
				</article>
			</div>
		</div>
	</div>
</article>
</template>


<script src="./index.js"></script>