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
								@change="onChangeQtumCore"
							/>
						</div>
						<p class="form-kit__description">
							Please be careful about changing this option.
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
							<form-radios
								name="theme"
								v-model="general.theme"
								:items="[
									{ label: 'Light', value: 'light' },
									{ label: 'Dark', value: 'dark' },
								]"/>
						</div>
					</dd>
				</dl>
				<nav class="form-kit__nav text-center">
					<button-basic
						type="submit"
						:label="(false ? 'Processing..' : 'APPLY')"
						:disabled="!true"
						@click="onSubmitGeneral"
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
import FormSwitch from '~/components/forms/form-switch';
import FormRadios from '~/components/forms/form-radios';

export default {
	components: {
		ButtonBasic,
		FormSwitch,
		FormRadios,
	},

	head: {
		title: lib.util.makeTitle('Settings')
	},

	async asyncData(cox) {
		const { store, $axios } = cox;

		return {
			qtum: {
				power: store.state.status.core,
			},
			general: {
				theme: 'light',
			},
		};
	},

	methods: {
		onChangeQtumCore: async function(sw=false)
		{
			// TODO: core를 껏다켜기 요청을 하고 결과를 받아서 `store`와 `qtumPower`의 상태를 변경한다.
			if (this.qtum.power)
			{
				if (confirm('Do you really want to turn off the Qtum-core?'))
				{
					this.qtum.power = sw;
				}
			}
			else
			{
				this.qtum.power = sw;
			}
		},
		onSubmitGeneral: async function(e)
		{
			e.preventDefault();
			console.log('qtum:', this.qtum);
			console.log('general:', this.general);
		},
	},
}
</script>