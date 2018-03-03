<template>
<main>
	<!-- Header -->
	<header class="layout-header">
		<div class="layout-header__wrap">
			<h1 class="layout-header__logo">
				<nuxt-link to="/" :title="title">
					<img
						:src="`/images/img-logo${status.testnet ? '-testnet' : ''}.png`"
						:srcset="`/images/img-logo${status.testnet ? '-testnet' : ''}@2x.png 2x`"
						alt="Qtum core web"
						class="layout-header__logo-basic"/>
					<img
						:src="`/images/img-logo-mobile${status.testnet ? '-testnet' : ''}.png`"
						:srcset="`/images/img-logo-mobile${status.testnet ? '-testnet' : ''}@2x.png 2x`"
						alt="Qtum core web"
						class="layout-header__logo-mobile"/>
				</nuxt-link>
			</h1>
			<div class="headerSide layout-header__right">
				<div class="headerSide__wrap headerSide__status">
					<span :title="status.core ? 'On core' : 'Off core'">
						<i class="sp-ico ico-status-power-on" v-if="status.core"></i>
						<i class="sp-ico ico-status-power-off" v-else></i>
					</span>
					<span :title="`${status.lock} wallet`" v-if="status.core && useLock">
						<i class="sp-ico ico-status-unlock" v-if="unLock"></i>
						<i class="sp-ico ico-status-lock" v-else></i>
					</span>
					<span :title="status.staking ? 'Staking' : 'Not staking'" v-if="status.core">
						<i class="sp-ico ico-status-staking-on" v-if="status.staking"></i>
						<i class="sp-ico ico-status-staking-off" v-else></i>
					</span>
				</div>
				<div class="headerSide__wrap headerSide__balance" v-if="status.core">
					<em class="headerSide__balanceText">{{ balance }}</em>
				</div>
				<div class="headerSide__wrap">
					<nav class="dropDown">
						<button type="button" class="dropDown__button" @click="toggleDropDown">
							<i class="sp-ico ico-person">profile</i>
						</button>
						<div class="dropDown__children dropDown__children-profile">
							<ul>
								<li>
									<nuxt-link to="/settings">Settings</nuxt-link>
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
						<li class="gnb__item" v-if="false">
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
	head() {
		const { $store } = this;
		let class_theme = $store.state.layout.theme || lib.constant.theme.light;
		return {
			htmlAttrs: {
				lang: $store.state.layout.language || 'en',
				class: !!class_theme ? `theme-${class_theme}` : null,
			}
		}
	},
	computed: {
		status() { return this.$store.state.status; },
		useLock() { return this.$store.state.status.lock !== lib.constant.lock.notEncrypted; },
		unLock() { return this.$store.state.status.lock === lib.constant.lock.unLock },
		layout() { return this.$store.state.layout; },
		system() { return this.$store.state.system; },
		balance() { return (this.$store.state.status.balance || 0).toFixed(2); },
		openSidebar() { return this.$store.state.openSidebar; }
	},
	methods: {
		toggleSideBar: function()
		{
			// set cookie
			lib.cookie.set('openSidebar', !this.$store.state.openSidebar ? '1' : '0', 7);
			// update store
			this.$store.commit('updateSidebar', !this.$store.state.openSidebar);
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
		},
	},
	beforeMount()
	{
		// set class name for touch device
		if (lib.util.detectTouch())
		{
			document.querySelector('html').classList.add('touch');
		}
	},
	mounted()
	{
		const { $store, $axios } = this;

		// 쿠기가 없으면 새로 설정한다.
		if (!document.cookie)
		{
			lib.cookie.set('openSidebar', '1', 7);
		}

		// set header in axios
		$axios.setHeader('testnet', $store.state.status.testnet ? 1 : 0);
		$axios.setHeader('language', $store.state.layout.language || 'en');
	},
	data()
	{
		return {
			title: process.env.TITLE,
		};
	},
}
</script>