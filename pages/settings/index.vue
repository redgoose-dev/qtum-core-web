<template>
<article class="contents settings">
	<header class="contents__header">
		<h1>Settings</h1>
	</header>

	<div class="contents__body">
		<section class="settings__section">
			<header class="settings__sectionHeader">
				<h1>qtum core</h1>
				<p>The area that manages the core.</p>
			</header>
			<div class="form-kit">
				<dl class="form-kit__horizontal">
					<dt>Power ON/OFF</dt>
					<dd>
						<div>
							// TODO: switch component
						</div>
						<p class="form-kit__description">
							Warning message
						</p>
					</dd>
				</dl>
			</div>
		</section>

		<section class="settings__section">
			<header class="settings__sectionHeader">
				<h1>General</h1>
				<p>Basic setting area</p>
			</header>
			<form class="form-kit settings__form">
				<dl class="form-kit__horizontal">
					<dt>Theme</dt>
					<dd>
						<div>
							// TODO: radio component
						</div>
					</dd>
				</dl>
				<nav class="form-kit__nav">
					<button-basic
						type="submit"
						:label="false ? 'Processing..' : 'APPLY'"
						:disabled="false"
						className="button-key button-inline"/>
				</nav>
			</form>
		</section>
	</div>
</article>
</template>


<script>
import * as lib from '~/lib';
import ButtonBasic from '~/components/button/button-basic';

export default {
	components: {
		ButtonBasic,
	},

	head: {
		title: lib.util.makeTitle('Settings')
	},

	methods: {

	},
}
</script>