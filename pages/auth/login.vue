<template>
<main>
	<article class="center-content login">
		<div class="login__body">
			<h1 class="login__logo">
				<img
					:src="`/images/img-login-logo${system.testnet ? '-testnet' : ''}.png`"
					:srcset="`/images/img-login-logo${system.testnet ? '-testnet' : ''}@2x.png`"
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
							minlength="4"
							v-model="password"
							required
							placeholder="Please enter a password."/>
						<i></i>
					</span>
				</fieldset>

				<form-checkbox
					label="Remember me"
					v-model="rememberAuth"
					className="login__rememberMe"/>

				<nav class="login__nav">
					<button-basic
						type="submit"
						:label="processing ? 'Processing..' : 'LOGIN'"
						:disabled="processing"
						className="button-key"/>
				</nav>
			</form>
		</div>
	</article>
</main>
</template>


<script>
import * as lib from '~/lib';
import FormCheckbox from '~/components/forms/form-checkbox';
import ButtonBasic from '~/components/button/button-basic';

export default {
	components: {
		FormCheckbox,
		ButtonBasic,
	},
	layout: 'blank',
	head: {
		title: lib.util.makeTitle('login')
	},
	computed: {
		system() { return this.$store.state.system; },
	},
	middleware: 'login',
	async asyncData(cox) {
		const { store, $axios } = cox;

		return {
			title: store.state.system.title,
			rememberAuth: false,
			password: '',
			processing: false,
		};
	},
	methods: {
		onSubmit: async function(e)
		{
			e.preventDefault();
			this.processing = true;

			// check password
			if (!(this.password && this.password.length >= 4))
			{
				alert('please input password');
				this.$refs.form_password.focus();
				return;
			}

			// call api
			let data = {
				remember: this.rememberAuth,
				password: this.password,
			};
			let res = await this.$axios.$post(`/api/login`, data);
			if (res.status === 'success' && !!res.data.hash)
			{
				// update store
				this.$store.commit('updateSystem', { hash: res.data.hash });
				// redirect index
				this.$router.replace('/');
			}
			else
			{
				alert('Login failed');
				this.$refs.form_password.focus();
			}

			// reset form data
			this.password = '';
			this.rememberAuth = false;
			this.processing = false;
		},
	},
}
</script>