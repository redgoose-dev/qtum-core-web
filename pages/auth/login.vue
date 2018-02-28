<template>
<main>
	<article class="center-content login">
		<div class="login__body">
			<h1 class="login__logo">
				<img
					:src="`/images/img-login-logo${testnet ? '-testnet' : ''}.png`"
					:srcset="`/images/img-login-logo${testnet ? '-testnet' : ''}@2x.png`"
					:alt="title"
					width="193"/>
			</h1>

			<form action="#" method="post" class="login__form" v-on:submit="onSubmit">
				<fieldset>
					<legend class="blind">login form</legend>
					<label for="login_password" class="login__label">Password</label>
					<span class="login__input">
						<input
							ref="form_password"
							type="password"
							id="login_password"
							name="password"
							maxlength="24"
							v-model="password"
							:required="!testnet"
							placeholder="Please enter a password."/>
						<i></i>
					</span>
				</fieldset>

				<div class="login__options">
					<form-check
						label="Remember me"
						v-model="rememberAuth"
						className="login__rememberMe"/>
					<br/>
					<form-check
						label="Using testnet"
						v-model="testnet"
						v-if="useTestnet"
						className="login__rememberMe"/>
				</div>

				<nav class="login__nav">
					<button-basic
						type="submit"
						:label="processing ? 'Processing..' : 'LOGIN'"
						:disabled="processing"
						className="button-color-key"/>
				</nav>
			</form>
		</div>
	</article>
</main>
</template>


<script>
import * as lib from '../../lib';
import FormCheck from '../../components/forms/form-check';
import ButtonBasic from '../../components/button/button-basic';

export default {
	components: {
		FormCheck,
		ButtonBasic,
	},
	layout: 'blank',
	head: {
		title: lib.util.makeTitle('login')
	},
	middleware: 'login',
	async asyncData(cox)
	{
		const { store } = cox;

		return {
			title: store.state.system.title,
			rememberAuth: false,
			password: '',
			useTestnet: store.state.system.useTestnet,
			testnet: false,
			processing: false,
		};
	},
	methods: {
		onSubmit: async function(e)
		{
			e.preventDefault();

			const { $refs, $axios, $store, $router, processing } = this;

			if (processing) return;

			this.processing = true;

			// call api
			let data = {
				remember: this.rememberAuth,
				password: this.password,
				testnet: this.testnet ? 1 : 0,
			};

			// request
			let res = await $axios.$post(`/api/login`, data);
			if (res.status === 'success' && !!res.data.hash)
			{
				// update store
				$store.commit('updateSystem', { hash: res.data.hash });
				// set header
				$axios.setHeader('testnet', data.testnet ? 1 : 0);
				// reset status
				await lib.util.resetStatus(this.$axios, $store, { testnet: data.testnet });
				// redirect index
				$router.replace('/');
			}
			else
			{
				alert('Login failed');
				$refs.form_password.focus();
			}

			// reset form data
			this.password = '';
			this.rememberAuth = false;
			this.processing = false;
		},
	},
	mounted: function()
	{
		this.$refs.form_password.focus();
	},
}
</script>