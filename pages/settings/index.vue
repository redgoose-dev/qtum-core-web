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
							<form-switch
								title="core power on/off"
								name="core_power"
								:value="qtum.power"
								@change="onChangeQtumCorePower"/>
							<loading-mini
								color="key"
								className="core__prosessing"
								v-if="core__power__processing"/>
						</div>
						<p class="form-kit__description">
							Please be careful about changing this option.
						</p>
					</dd>
				</dl>
				<form v-if="status.core && useLock" @submit="onSubmitUnlock">
					<dl class="form-kit__horizontal unlock" v-if="!qtum.unLock">
						<dt>Unlock wallet</dt>
						<dd>
							<div class="unlock__password">
								<form-text
									type="password"
									name="password"
									id="form_password"
									placeholder="Please input password"
									maxlength="30"
									:required="true"
									className="form-text-block"/>
							</div>
							<div class="unlock__check">
								<form-check label="For staking only" name="staking" value="1"/>
							</div>
							<div class="unlock__button">
								<button-basic
									type="submit"
									:label="core__unlock__processing ? `Processing..` : `Unlock wallet`"
									:loading="core__unlock__processing"
									:disabled="core__unlock__processing"
									className="button-color-key button-inline button-size-small"/>
							</div>
						</dd>
					</dl>
					<dl class="form-kit__horizontal unlock" v-else>
						<dt>Unlock wallet</dt>
						<dd>
							<button-basic
								type="button"
								:label="core__unlock__processing ? `Processing..` : `Lock wallet`"
								:loading="core__unlock__processing"
								:disabled="core__unlock__processing"
								@click="onChangeLock"
								className="button-color-key button-inline button-size-small button-color-key"/>
						</dd>
					</dl>
				</form>
			</div>
		</section>
		<section class="settings__section">
			<header class="settings__sectionHeader">
				<h1>General</h1>
				<p>Basic setting area</p>
			</header>
			<form class="form-kit settings__form" @submit="onSubmitGeneral">
				<dl class="form-kit__horizontal">
					<dt>Theme</dt>
					<dd>
						<div>
							<form-radios
								name="theme"
								v-model="general.theme"
								:items="[
									{ label: 'Light', value: constant.theme.light },
									{ label: 'Dark', value: constant.theme.dark },
								]"/>
						</div>
					</dd>
				</dl>
				<nav class="form-kit__nav text-center">
					<button-basic
						type="submit"
						:label="(false ? 'Processing..' : 'APPLY')"
						:disabled="!true"
						className="button-color-key button-inline"/>
				</nav>
			</form>
		</section>
	</div>
</article>
</template>

<script>
import * as lib from '~/lib';
import ButtonBasic from '~/components/button/button-basic';
import FormSwitch from '~/components/forms/form-switch';
import FormRadios from '~/components/forms/form-radios';
import FormCheck from '~/components/forms/form-check';
import LoadingMini from '~/components/loading/loading-mini';
import FormText from '~/components/forms/form-text';

export default {
	components: {
		ButtonBasic,
		FormSwitch,
		FormRadios,
		FormCheck,
		LoadingMini,
		FormText,
	},

	head: {
		title: lib.util.makeTitle('Settings')
	},

	computed: {
		status() { return this.$store.state.status; },
		useLock() { return this.$store.state.status.lock !== lib.constant.lock.notEncrypted; },
		constant() { return lib.constant; }
	},

	async asyncData(cox) {
		const { store, $axios } = cox;

		return {
			core__power__processing: false,
			core__unlock__processing: false,
			qtum: {
				power: store.state.status.core,
				unLock: store.state.status.lock === lib.constant.lock.unLock,
			},
			general: {
				theme: lib.constant.theme.light,
			},
		};
	},

	methods: {
		/**
		 * on change power qtum core
		 *
		 * @param {Boolean} sw
		 */
		onChangeQtumCorePower: async function(sw=false)
		{
			const { qtum, $store, $axios, core__power__processing } = this;

			if (core__power__processing) return;

			if (qtum.power)
			{
				// turn off qtum core

				if (confirm('Do you really want to turn off the Qtum-core?'))
				{
					// on processing
					this.core__power__processing = true;

					try
					{
						let response = await $axios.$post('/api/core-power', {
							hash: $store.state.system.hash,
							power: false,
						});
						if (response.status === 'success')
						{
							// reset status
							await lib.util.sleep(500);
							await lib.util.resetStatus($axios, $store);
							// turn off switch
							qtum.power = sw;
							// off processing
							this.core__power__processing = false;
						}
						else
						{
							throw 'error turn off qtum-core';
						}
					}
					catch(e)
					{
						alert('Failed turn off qtum-core');
						console.error(e);
						this.core__power__processing = false;
					}
				}
			}
			else
			{
				// turn on qtum core

				// on processing
				this.core__power__processing = true;

				try
				{
					let response = await $axios.$post('/api/core-power', {
						hash: $store.state.system.hash,
						power: true,
					});
					if (response.status === 'success')
					{
						response = await $axios.$get(`/api`);

						// check
						if (response.status === 'error') throw '';
						if (!response.info) throw '';

						// reset status
						await lib.util.sleep(100);
						await lib.util.resetStatus($axios, $store);

						// turn on switch
						qtum.power = sw;
						// off processing
						this.core__power__processing = false;
					}
					else
					{
						throw 'error turn on qtum-core';
					}
				}
				catch(e)
				{
					alert('Failed turn on qtum-core');
					console.error(e);
					this.core__power__processing = false;
				}
			}
		},
		/**
		 * on submit general
		 *
		 * @param {Event} e
		 * @return {Promise}
		 */
		onSubmitGeneral: async function(e)
		{
			e.preventDefault();

			// TODO: 설정을 변경하는 API 요청
			console.log('qtum:', this.qtum);
			console.log('general:', this.general);
		},
		onSubmitUnlock: async function(e)
		{
			const { $store, $axios, core__unlock__processing, qtum } = this;

			e.preventDefault();

			const target = e.target;

			// check password value
			if (!target.password.value)
			{
				alert('Please input password.');
				target.password.focus();
				return;
			}

			this.core__unlock__processing = true;

			// call api
			try
			{
				let response = await $axios.$post('/api/core-unlock', {
					hash: $store.state.system.hash,
					password: target.password.value,
					staking: !!target.staking.checked ? 'true' : 'false',
				});
				if (response.status !== 'success') throw 'error';
				// reset status
				await lib.util.sleep(3000);
				await lib.util.resetStatus($axios, $store);
				// update unlock
				this.qtum.unLock = true;
			}
			catch(e)
			{
				alert('Failed unlock wallet.');
				console.error(e);
			}
			this.core__unlock__processing = false;
		},
		onChangeLock: async function(e)
		{
			const { $store, $axios, core__unlock__processing } = this;

			if (confirm('Do you really want to lock it?'))
			{
				this.core__unlock__processing = true;
				try
				{
					let response = await $axios.$post('/api/core-lock', {
						hash: $store.state.system.hash,
					});
					if (response.status !== 'success') throw 'error';
					// reset status
					await lib.util.sleep(3000);
					await lib.util.resetStatus($axios, $store);
					// update unlock
					this.qtum.unLock = false;
				}
				catch(e)
				{
					alert('Failed lock wallet.');
					console.log(e);
				}
				this.core__unlock__processing = false;
			}
		}
	},
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/variables";

.core__prosessing {
	margin-left: 10px;
}
.unlock {
	border-top: 1px solid $color-medium-gray;
	padding-bottom: 0;
	&__password {}
	&__check {
		margin: 5px 0 0;
	}
	&__button {
		margin: 8px 0 0;
	}
}
</style>