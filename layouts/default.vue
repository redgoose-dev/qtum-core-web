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
				<div class="headerSide__wrap headerSide__status" v-if="showStatus">
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
				<div class="headerSide__wrap headerSide__balance" v-if="showStatus && core">
					<em class="headerSide__balanceText">{{ balance }}</em>
				</div>
				<nuxt-link to="/auth/login" class="headerSide__wrap headerSide__settings" v-if="!isLogin">
					<i class="sp-ico ico-lock">login</i>
				</nuxt-link>
				<div class="headerSide__wrap" v-else-if="!systemError">
					<nav class="dropDown">
						<button type="button" class="dropDown__button" @click="toggleDropDown">
							<i class="sp-ico ico-person">profile</i>
						</button>
						<div class="dropDown__children dropDown__children-profile">
							<ul>
								<li>
									<nuxt-link to="/settings">Settings</nuxt-link>
								</li>
								<li v-if="core && lock">
									<nuxt-link to="/unlock-wallet">Unlock wallet</nuxt-link>
								</li>
								<li v-if="core && !lock">
									<button type="button">Lock wallet</button>
								</li>
								<li>
									<nuxt-link to="/auth/logout">Logout</nuxt-link>
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</div>
		</div>
	</header>
	<!-- // Header -->

	<!-- Container -->
	<div :class="[
		'layout-container',
		!openSidebar && 'layout-container-minimum-side',
		!core && 'layout-container-off-side',
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
							<nuxt-link to="/receive" title="Receive">
								<em><i class="sp-ico ico-gnb-receive"></i></em>
								<span>RECEIVE</span>
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
import * as lib from '../lib';
export default {
	computed: {
		core() { return this.$store.state.status.core; },
		staking() { return this.$store.state.status.staking; },
		balance() { return this.$store.state.status.balance.toFixed(2); },
		openSidebar() { return this.$store.state.layout.openSidebar; },
		lock() { return this.$store.state.status.lock; },
		isLogin() { return !!this.$store.state.system.hash; },
		showStatus() {
			const { system, status } = this.$store.state;
			if (status.error)
			{
				return false;
			}
			if (lib.object.findKeyInArray(system.notAllow, 'layout'))
			{
				return !!system.hash;
			}
			else
			{
				return true;
			}
		},
		systemError() {
			return !!this.$store.state.status.error;
		}
	},
	methods: {
		toggleSideBar: function()
		{
			this.$store.commit('updateLayout', {
				openSidebar: !this.$store.state.layout.openSidebar,
			});
		},
		toggleDropDown: function(e)
		{
			e.stopPropagation();

			const classNameActive = 'dropDown__button-active';
			const classList = e.currentTarget.classList;

			function close()
			{
				classList.remove(classNameActive);
				document.removeEventListener('click', close);
			}

			if (classList.contains(classNameActive))
			{
				classList.remove(classNameActive);
			}
			else
			{
				classList.add(classNameActive);
				document.addEventListener('click', close);
			}
		}
	},
	mounted()
	{
		if (lib.util.detectTouch())
		{
			document.querySelector('html').classList.add('touch');
		}
	},
	data()
	{
		return {
			title: process.env.TITLE,
		};
	},
}
</script>