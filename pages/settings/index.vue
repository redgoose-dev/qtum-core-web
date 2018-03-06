<template>
<article class="contents settings">
	<header class="contents__header">
		<h1>{{$lang.out('layout.profileMenu.settings')}}</h1>
	</header>

	<div class="contents__body">
		<section class="settings__section core">
			<header class="settings__sectionHeader">
				<h1>{{$lang.out('settings.qtum.title')}}</h1>
				<p>{{$lang.out('settings.qtum.description')}}</p>
			</header>
			<div class="form-kit core__body">
				<dl class="form-kit__horizontal">
					<dt>{{status.testnet ? $lang.out('global.testnet') : $lang.out('global.mainnet')}} ON/OFF</dt>
					<dd>
						<div>
							<form-switch
								:title="$lang.out('settings.qtum.changeCorePower')"
								:disabled="processing.core__power"
								:value="qtum.power"
								@change="onChangeQtumCorePower"/>
							<loading-mini
								color="key"
								className="core__prosessing"
								v-if="processing.core__power"/>
						</div>
						<p class="form-kit__description">
							{{$lang.out('settings.qtum.warning_changeValue')}}
						</p>
					</dd>
				</dl>
				<form v-if="qtum.useLock" @submit="onSubmitUnlock">
					<dl class="form-kit__horizontal unlock" v-if="!qtum.unLock">
						<dt>{{$lang.out('settings.qtum.lockWalletTitle')}}</dt>
						<dd>
							<div class="unlock__password">
								<form-text
									type="password"
									name="password"
									id="form_password"
									:placeholder="$lang.out('message.placeholder_password')"
									maxlength="30"
									:required="true"
									className="form-text-block"/>
							</div>
							<div class="unlock__check">
								<form-check
									:label="$lang.out('settings.qtum.forStakingOnly')"
									name="staking"
									value="1"/>
							</div>
							<div class="unlock__button">
								<button-basic
									type="submit"
									:label="processing.core__unlock ? `${$lang.out('global.processing')}..` : $lang.out('settings.qtum.unlockWallet')"
									:loading="processing.core__unlock"
									:disabled="processing.core__unlock"
									className="button-color-key button-inline button-size-small"/>
							</div>
						</dd>
					</dl>
					<dl class="form-kit__horizontal unlock" v-else>
						<dt>{{$lang.out('settings.qtum.lockWalletTitle')}}</dt>
						<dd>
							<button-basic
								type="button"
								:label="processing.core__unlock ? `${$lang.out('global.processing')}..` : $lang.out('settings.qtum.lockWallet')"
								:loading="processing.core__unlock"
								:disabled="processing.core__unlock"
								@click="onChangeLock"
								className="button-color-key button-inline button-size-small button-color-key"/>
						</dd>
					</dl>
				</form>
			</div>
		</section>
		<section class="settings__section">
			<header class="settings__sectionHeader">
				<h1>{{$lang.out('global.layout')}}</h1>
				<p>Layout setting area</p>
			</header>
			<form class="form-kit settings__form" @submit="onSubmitLayout">
				<dl class="form-kit__horizontal">
					<dt>Theme</dt>
					<dd>
						<form-radios
							name="theme"
							v-model="layout.theme"
							:items="[
								{ label: 'Light', value: constant.theme.light },
								{ label: 'Dark', value: constant.theme.dark },
							]"/>
					</dd>
				</dl>
				<dl class="form-kit__horizontal">
					<dt>Language</dt>
					<dd>
						<form-radios
							name="language"
							v-model="layout.language"
							:items="[
							{ label: 'English', value: 'en' },
							{ label: '한국어', value: 'ko' },
						]"/>
					</dd>
				</dl>
				<dl class="form-kit__horizontal">
					<dt>Items count</dt>
					<dd class="fields">
						<div>
							<label>
								<form-text
									type="text"
									name="count__recent_transactions"
									:value="layout.count__recentTransactions"
									size="4"
									maxlength="2"
									placeholder="Please input number."
									className="form-text-size-small"/>
							</label>
							<p class="form-kit__description">
								Set count from "Recent transactions".
							</p>
						</div>
						<div>
							<form-text
								type="text"
								name="count__transactions"
								:value="layout.count__transactions"
								size="4"
								maxlength="2"
								placeholder="Please input number."
								className="form-text-size-small"/>
							<p class="form-kit__description">
								Set count from "Transaction".
							</p>
						</div>
					</dd>
				</dl>
				<nav class="form-kit__nav text-center">
					<button-basic
						type="submit"
						:label="processing.layout ? 'Processing..' : 'Update layout'"
						:disabled="processing.layout"
						:loading="processing.layout"
						className="button-color-key button-inline"/>
				</nav>
			</form>
		</section>
	</div>
</article>
</template>

<script>
import * as lib from '../../lib';
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
		constant() { return lib.constant; }
	},
	async asyncData(cox)
	{
		const { store, $axios } = cox;
		const { status, layout } = store.state;

		return {
			processing: {
				core__power: false,
				core__unlock: false,
				core__testnet: false,
				layout: false,
			},
			qtum: {
				power: status.core,
				useLock: status.core && (status.lock !== lib.constant.lock.notEncrypted),
				unLock: status.lock === lib.constant.lock.unLock,
				testnet: status.testnet,
			},
			layout: {
				theme: layout.theme || lib.constant.theme.light,
				count__recentTransactions: layout.count__recentTransactions || lib.constant.count.recent_transactions,
				count__transactions: layout.count__transactions || lib.constant.count.transactions,
				language: layout.language || 'en',
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
			const { qtum, $store, $axios, processing } = this;

			if (processing.core__power) return;

			if (qtum.power)
			{
				// turn off qtum core

				if (confirm('Do you really want to turn off the Qtum-core?'))
				{
					// on processing
					processing.core__power = true;

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
							// change useLock
							qtum.useLock = false;
							// off processing
							processing.core__power = false;
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
						processing.core__power = false;
					}
				}
			}
			else
			{
				// turn on qtum core

				// on processing
				processing.core__power = true;

				try
				{
					let response = await $axios.$post('/api/core-power', {
						hash: $store.state.system.hash,
						power: true,
					});
					if (response.status !== 'success')
					{
						throw 'error turn on qtum-core';
					}

					// get initialize data
					response = await $axios.$post(`/api`, { hash: $store.state.system.hash });

					// check
					if (response.status === 'error') throw '';
					if (!response.info) throw '';

					// reset status
					await lib.util.sleep(100);
					await lib.util.resetStatus($axios, $store);

					const status = $store.state.status;

					// turn on switch
					qtum.power = sw;
					// change useLock
					qtum.useLock = status.core && (status.lock !== lib.constant.lock.notEncrypted);
					// off processing
					processing.core__power = false;
				}
				catch(e)
				{
					alert('Failed turn on qtum-core');
					console.error(e);
					processing.core__power = false;
				}
			}
		},
		/**
		 * on submit layout
		 *
		 * @param {Event} e
		 * @return {Promise}
		 */
		onSubmitLayout: async function(e)
		{
			const { $store, $axios, processing } = this;

			e.preventDefault();

			processing.layout = true;

			let response = await $axios.$post('/api/update-layout', {
				theme: e.target.theme.value,
				count__recentTransactions: parseInt(e.target.count__recent_transactions.value),
				count__transactions: parseInt(e.target.count__transactions.value),
				language: e.target.language.value,
			});
			await lib.util.sleep(300);

			processing.layout = false;

			if (response.status === 'error')
			{
				alert('Failed to update layout.');
				return;
			}
			if (response.data)
			{
				// update store
				$store.commit('updateLayout', response.data);
				// set header
				$axios.setHeader('testnet', e.target.language.value || 'en');
			}
		},
		/**
		 * on submit unlock
		 *
		 * @param {Event} e
		 * @return {Promise}
		 */
		onSubmitUnlock: async function(e)
		{
			const { $store, $axios, processing, qtum } = this;

			e.preventDefault();

			const target = e.target;

			// check password value
			if (!target.password.value)
			{
				alert('Please input password.');
				target.password.focus();
				return;
			}

			processing.core__unlock = true;

			// call api
			try
			{
				let response = await $axios.$post('/api/core-unlock', {
					hash: $store.state.system.hash,
					password: target.password.value,
					staking: target.staking.checked ? 'true' : 'false',
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
			processing.core__unlock = false;
		},
		/**
		 * on change lock
		 *
		 * @param {Event} e
		 * @return {Promise}
		 */
		onChangeLock: async function(e)
		{
			const { $store, $axios, processing } = this;

			if (confirm('Do you really want to lock it?'))
			{
				processing.core__unlock = true;
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
					console.error(e);
				}
				processing.core__unlock = false;
			}
		},
	},
}
</script>