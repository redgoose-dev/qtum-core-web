<template>
<main>
	<article class="login center-content">
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
					className="foooo"/>

				<nav>
					<form-button
						type="submit"
						label="LOGIN"
						class="form-button"/>
				</nav>
			</form>
		</div>
	</article>
</main>
</template>


<script>
import FormCheckbox from '~/components/forms/form-checkbox';
import FormButton from '~/components/forms/form-button';
import * as lib from '~/lib';

export default {
	components: {
		FormCheckbox,
		FormButton,
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