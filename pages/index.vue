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
							<dt><strong>Balance</strong></dt>
							<dd class="size-large"><strong class="text-key">{{ balance }} QTUM</strong></dd>
						</dl>
						<dl class="description" v-if="stake > 0">
							<dt>Staked</dt>
							<dd><strong>{{ stake }}</strong></dd>
						</dl>
						<dl class="description" v-if="immature_balance > 0">
							<dt>Immature</dt>
							<dd><strong>{{ immature_balance }}</strong></dd>
						</dl>
						<dl class="description" v-if="unconfirmed_balance > 0">
							<dt>Unconfirmed</dt>
							<dd><strong>{{ unconfirmed_balance }}</strong></dd>
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
							<dd><strong>v{{ version }}</strong></dd>
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
						<dl class="description" v-if="testnet">
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
											<b>Date</b>
											<em>{{ o.time }}</em>
										</span>
										<span>
											<b>Amount</b>
											<em>{{ o.amount }}</em>
										</span>
										<span v-if="!!o.fee">
											<b>Fee</b>
											<em>{{ o.fee }}</em>
										</span>
										<span>
											<b>Confirm</b>
											<em>{{ o.confirm }}</em>
										</span>
									</p>
									<p class="index__description index__description-nowrap">
										Transaction ID: <a v-bind:href="o.txUrl" target="_blank">{{ o.txid }}</a>
									</p>
								</div>
								<div class="index__col index__col-type">
									<p :class="[
										'index__type',
										o.type === 'send' && 'text-error',
										o.type === 'receive' && 'text-success'
									]">
										{{ o.type }}
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

<style lang="scss" scoped>
@import "../assets/scss/variables";

.row {
	display: flex;
	margin: 0 -10px;
	padding: 10px 0;
	&:first-child {
		padding-top: 0;
	}
	&:last-child {
		padding-bottom: 0;
	}
	.col {
		flex: 1;
		padding: 0 10px;
		overflow: hidden;
	}
}
.section {
	$self: '.section';
	border: 1px solid $color-medium-gray;
	background: #fff;
	&__head {
		display: flex;
		height: 40px;
		align-items: center;
		background: $color-medium-gray;
		h1 {
			flex: 1;
			margin: 0;
			padding: 0 0 0 15px;
			font-size: 16px;
		}
		nav {
			padding: 0 5px 0 0;
			height: 100%;
			a {
				display: flex;
				height: 100%;
				width: 40px;
				align-items: center;
				justify-content: center;
				&:focus {
					outline: $border-focus;
				}
			}
		}
	}
	&__body {
		padding: 15px 15px;
		.table {
			margin: -5px 0;
			font-size: 13px;
			thead {
				th {
					padding: 12px 8px 12px 8px;
				}
			}
			tbody {
				td {
					padding: 12px 8px;
				}
			}
		}
	}

	&-transactions {
		#{$self}__body {
			padding: 0;
		}
	}
}

@media (max-width: $size-mobile) {
	.row {
		display: block;
		margin: 0;
		padding: 8px 0;
		.col {
			padding: 8px 0;
			&:first-child {
				padding-top: 0;
			}
			&:last-child {
				padding-bottom: 0;
			}
		}
	}
	.section {
		&__body {
			.description {
				&-hidden {
					display: none;
				}
			}
		}
	}
}
</style>