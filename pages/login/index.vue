<template>
<main>
	<article class="center-content login">
		<div class="login__body">
			<h1 class="login__logo">
				<img
					src="~/static/images/img-login-logo.png"
					srcset="~/static/images/img-login-logo@2x.png"
					:alt="title"
					width="193"/>
			</h1>

			<form action="#" method="post" class="login__form" v-on:submit="onSubmit">
				<fieldset>
					<legend class="blind">login form</legend>
					<label for="login_password" class="login__label">Password</label>
					<span class="login__input">
						<input
							type="password"
							id="login_password"
							name="password"
							maxlength="24"
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
						label="LOGIN"
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
	middleware: 'login',
	asyncData({ store }) {
		return {
			title: store.state.system.title,
			rememberAuth: false,
		};
	},
	methods: {
		onSubmit: function(e)
		{
			e.preventDefault();
			console.log('call on submit');
		},
	},
}
</script>