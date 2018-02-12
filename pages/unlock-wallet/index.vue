<template>
<article class="contents unlockWallet">
	<header class="contents__header">
		<h1>Unlock wallet</h1>
	</header>

	<form class="contents__body" @submit="onSubmit">
		<section class="settings__section">
			<div class="form-kit">
				<dl class="form-kit__horizontal">
					<dt><label for="form_password">Enter passphrase</label></dt>
					<dd>
						<form-text
							type="password"
							name="password"
							v-model="form.password"
							id="form_password"
							placeholder="Please input password"
							maxlength="30"
							className="form-text-block"/>
					</dd>
				</dl>
				<dl class="form-kit__horizontal">
					<dt></dt>
					<dd>
						<form-check
							label="For staking only"
							v-model="form.forStaking"
						/>
					</dd>
				</dl>
			</div>
		</section>

		<nav class="form-kit__nav form-kit__nav-noline text-center">
			<button-basic
				type="submit"
				:label="(processing ? 'PROCESSING..' : 'UNLOCK WALLET')"
				:disabled="processing"
				className="button-key button-inline"
			/>
		</nav>
	</form>
</article>
</template>

<script>
import * as lib from '~/lib';
import FormText from '~/components/forms/form-text';
import FormCheck from '~/components/forms/form-check';
import ButtonBasic from '~/components/button/button-basic';

export default {
	head: {
		title: lib.util.makeTitle('unlock wallet')
	},

	components: {
		FormText,
		FormCheck,
		ButtonBasic,
	},

	middleware: 'checkCore',

	data()
	{
		return {
			form: {
				password: '',
				forStaking: false,
			},
			processing: false,
		};
	},

	methods: {
		onSubmit: async function(e)
		{
			e.preventDefault();

			this.processing = true;

			// TODO: 지갑언락 API 요청하기
			console.log(this.form);
		}
	},
}
</script>