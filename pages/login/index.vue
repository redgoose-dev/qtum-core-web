<template>
<main>
	<article class="login center-content">
		<div class="login__body">
			<h1 class="login__logo">
				<img
					src="~/static/images/img-login-logo.png"
					srcset="~/static/images/img-login-logo@2x.png"
					v-bind:alt="title"
					width="193"/>
			</h1>

			<form action="#" method="post" class="login__form">
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
			</form>
		</div>
	</article>
</main>
</template>


<script>
import * as lib from '../../lib';

export default {
	layout: 'blank',
	head: {
		title: lib.util.makeTitle('login')
	},
	middleware: 'login',
	asyncData({ store }) {
		return {
			title: store.state.system.title,
		};
	},
	methods: {
		back: function(e)
		{
			this.$router.go(-1);
		}
	},
}
</script>
