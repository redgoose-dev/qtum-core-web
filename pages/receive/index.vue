<template>
<article class="contents receive">
	<header class="contents__header">
		<h1>Receive</h1>
	</header>

	<div class="contents__body">
		<div class="contents__box">
			<div class="table__responsive table__responsive-border">
				<table class="table">
					<thead>
					<tr>
						<th scope="col">Address</th>
						<th scope="col">Label</th>
					</tr>
					</thead>
					<tbody>
					<template v-if="index.length">
						<tr v-for="o in index">
							<td class="text-center" data-name="Address">{{ o.address }}</td>
							<td class="text-center" data-name="Label">
								<strong class="text-brackets-quotes">{{ o.label }}</strong>
							</td>
						</tr>
					</template>
					<template v-else>
						<tr class="table__empty">
							<td colspan="6">not found article</td>
						</tr>
					</template>
					</tbody>
				</table>
			</div>
		</div>
		<nav class="text-center">
			<button-basic
				type="button"
				label="Add address"
				@click="onShowAddAddress"
				className="button-color-key button-inline button-size-small"/>
		</nav>
	</div>

	<layout-popup
		title="Add address"
		v-if="show__addAddress"
		@close="onCloseAddAddress">
		<form class="form-kit popup-form" @submit="onSubmitAddAddress">
			<dl class="form-kit__vertical">
				<dt>Label name</dt>
				<dd>
					<form-text
						type="text"
						name="label"
						id="form_label"
						value=""
						maxlength="20"
						placeholder="Please input label"
						className="form-text-block"/>
					<p class="form-kit__description">
						Enter a name for the new address.
					</p>
				</dd>
			</dl>
			<nav class="form-kit__nav text-center">
				<button-basic
					type="submit"
					:label="processing__addAddress ? `Processing..` : `Add address`"
					:disabled="processing__addAddress"
					:loading="processing__addAddress"
					className="button-color-key button-inline"/>
			</nav>
		</form>
	</layout-popup>
</article>
</template>


<script>
import * as lib from '../../lib';
import ButtonBasic from '~/components/button/button-basic';
import FormText from '~/components/forms/form-text';
import LayoutPopup from '~/components/layout/layout-popup';

export default {
	components: {
		ButtonBasic,
		FormText,
		LayoutPopup,
	},
	head: {
		title: lib.util.makeTitle('Receive')
	},
	middleware: 'checkCore',
	async asyncData(cox)
	{
		const { error, $axios } = cox;
		let result = {
			index: [],
			show__addAddress: false,
			processing__addAddress: false,
		};
		try
		{
			let res = await $axios.$get(`/api/receive`);
			if (!(res.status === 'success' && !!res.data)) throw 'API import failed.';
			return {
				...result,
				index: res.data,
			};
		}
		catch(e)
		{
			error({
				statusCode: 400,
				title: 'Receive',
				message: 'Failed to import API',
			});
		}
	},
	methods: {
		onShowAddAddress: function()
		{
			this.show__addAddress = true;
		},
		onCloseAddAddress: function()
		{
			this.show__addAddress = false;
		},
		onSubmitAddAddress: async function(e)
		{
			e.preventDefault();

			const { $axios } = this;

			this.processing__addAddress = true;

			try
			{
				// add address
				let response = await $axios.$post('/api/receive/add-address', { label: e.target.label.value });
				if (response.status !== 'success') throw 'Failed add address';

				// get index
				let index = await $axios.$get(`/api/receive`);
				if (!(index.status === 'success' && !!index.data)) throw 'API import failed.';
				this.index = index.data;

				// false processing and hide popup
				this.processing__addAddress = false;
				this.show__addAddress = false;
			}
			catch(e)
			{
				alert('Service error');
				console.error(e);
			}
		},
	},
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.popup-form {
	min-width: 420px;
	.form-kit__vertical {
		border-top: none;
		margin: 20px 0 0;
		padding: 0;
		&:first-child {
			margin-top: 0;
		}
	}
	.form-kit__nav {
		padding-top: 25px;
		border-top: none;
	}
}

@media (max-width: $size-mobile) {
	.table {
		tbody {
			tr {
				padding: 20px 15px;
			}
		}
	}
	.popup-form {
		min-width: auto;
		.form-kit__nav {
			padding-top: 20px;
		}
	}
}
</style>