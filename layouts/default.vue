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
							alt="Qtum core web"/>
				</nuxt-link>
			</h1>
			<div class="headerSide layout-header__right">
				<div class="headerSide__wrap headerSide__balance">
					<em class="headerSide__balanceText">{{ balance }} QTUM</em>
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
		minimumSide && 'layout-container-minimum-side'
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
							<nuxt-link to="/" title="DASHBOARD">
								<i class="sp-ico ico-gnb-home"></i>
								<span>DASHBOARD</span>
							</nuxt-link>
						</li>
						<li class="gnb__item">
							<nuxt-link to="/transactions" title="TRANSACTIONS">
								<i class="sp-ico ico-gnb-switch"></i>
								<span>TRANSACTIONS</span>
							</nuxt-link>
						</li>
						<li class="gnb__item">
							<nuxt-link to="/send" title="SEND">
								<i class="sp-ico ico-gnb-post"></i>
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
		balance() {
			return this.$store.state.balance.toFixed(6);
		}
	},
	data() {
		return {
			title: process.env.TITLE,
			minimumSide: false,
		};
	},
	methods: {
		logout: function(e)
		{
			alert('call logout');
			console.log('call logout');
		},
		toggleSideBar: function()
		{
			this.minimumSide = !this.minimumSide;
		}
	}
}
</script>