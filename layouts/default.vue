<template>
<main>
	<!-- Header -->
	<header class="layout-header">
		<div class="layout-header__wrap">
			<h1 class="layout-header__logo">
				<nuxt-link to="/" :title="title">
					<img
						src="~static/images/img-logo.png"
						srcset="~static/images/img-logo@2x.png 2x"
						alt="Qtum core web"
						class="layout-header__logo-basic"/>
					<img
						src="~static/images/img-logo-mobile.png"
						srcset="~static/images/img-logo-mobile@2x.png 2x"
						alt="Qtum core web"
						class="layout-header__logo-mobile"/>
				</nuxt-link>
			</h1>
			<div class="headerSide layout-header__right">
				<div class="headerSide__wrap headerSide__status">
					<span :title="core ? 'On core' : 'Off core'">
						<i class="sp-ico ico-status-power-on" v-if="core"></i>
						<i class="sp-ico ico-status-power-off" v-else></i>
					</span>
					<span :title="`${lock} wallet`" v-if="core">
						<i class="sp-ico ico-status-unlock" v-if="lock === 'unLock'"></i>
						<i class="sp-ico ico-status-lock" v-else></i>
					</span>
					<span :title="staking ? 'Staking' : 'Not staking'" v-if="core">
						<i class="sp-ico ico-status-staking-on" v-if="staking"></i>
						<i class="sp-ico ico-status-staking-off" v-else></i>
					</span>
				</div>
				<div class="headerSide__wrap headerSide__balance">
					<em class="headerSide__balanceText">{{ balance }}</em>
				</div>
				<div v-if="true" class="headerSide__wrap">
					<nav class="dropDown">
						<button type="button" class="dropDown__button">
							<i class="sp-ico ico-person">profile</i>
						</button>
						<div class="dropDown__children dropDown__children-profile">
							<ul>
								<li>
									<nuxt-link to="/settings">Settings</nuxt-link>
								</li>
								<li>
									<button v-on:click="logout">Logout</button>
								</li>
							</ul>
						</div>
					</nav>
				</div>
				<!--<nuxt-link to="/setting" class="headerSide__wrap headerSide__settings">-->
					<!--<i class="sp-ico ico-setting">setting</i>-->
				<!--</nuxt-link>-->
			</div>
		</div>
	</header>
	<!-- // Header -->

	<!-- Container -->
	<div :class="[
		'layout-container',
		!openSidebar && 'layout-container-minimum-side'
	]">
		<!-- Side bar -->
		<div class="layout-container__sideWrap">
			<aside class="layout-side layout-container__side">
				<button type="button" v-on:click="toggleSideBar" title="toggle side bar" class="toggle-sidebar">
					<i class="sp-ico ico-arrow-left">toggle sidebar</i>
				</button>
				<nav class="gnb">
					<ul>
						<li class="gnb__item">
							<nuxt-link to="/" title="Dashboard">
								<em><i class="sp-ico ico-gnb-home"></i></em>
								<span>DASHBOARD</span>
							</nuxt-link>
						</li>
						<li class="gnb__item">
							<nuxt-link to="/transactions" title="Transactions">
								<em><i class="sp-ico ico-gnb-switch"></i></em>
								<span>TRANSACTIONS</span>
							</nuxt-link>
						</li>
						<li class="gnb__item">
							<nuxt-link to="/wallets" title="Wallets">
								<em><i class="sp-ico ico-gnb-wallet"></i></em>
								<span>WALLETS</span>
							</nuxt-link>
						</li>
						<li class="gnb__item">
							<nuxt-link to="/send" title="Send to">
								<em><i class="sp-ico ico-gnb-post"></i></em>
								<span>SEND</span>
							</nuxt-link>
						</li>
					</ul>
				</nav>
			</aside>
		</div>
		<!-- // Side bar -->

		<div class="layout-body layout-container__body">
			<!-- Contents -->
			<nuxt/>
			<!-- // Contents -->

			<!-- Footer -->
			<footer class="layout-footer">
				<p class="copyright">
					Core by <a href="https://qtum.org" target="_blank">qtum.org</a>. Publishing by <a href="https://redgoose.me" target="_blank">redgoose.me</a>.
				</p>
			</footer>
			<!-- // Footer -->
		</div>
	</div>
	<!-- // Container -->
</main>
</template>


<script>
export default {
	computed: {
		core() { return this.$store.state.status.core; },
		staking() { return this.$store.state.status.staking; },
		balance() { return this.$store.state.status.balance.toFixed(2); },
		openSidebar() { return this.$store.state.layout.openSidebar; },
		lock() { return this.$store.state.status.lock; },
	},
	data() {
		return {
			title: process.env.TITLE,
		};
	},
	methods: {
		logout: function(e)
		{
			alert('call logout');
			console.log('TODO: call logout');
		},
		toggleSideBar: function()
		{
			this.$store.commit('updateLayout', {
				openSidebar: !this.$store.state.layout.openSidebar,
			});
		}
	}
}
</script>