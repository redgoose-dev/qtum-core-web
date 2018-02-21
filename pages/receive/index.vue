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
						<th scope="col">Amount</th>
						<th scope="col">Confirm</th>
					</tr>
					</thead>
					<tbody>
					<template v-if="index.length">
						<tr v-for="o in index">
							<td class="text-center">{{ o.address }}</td>
							<td class="text-center">
								<strong class="text-brackets-quotes">{{ o.label }}</strong>
							</td>
							<td class="text-center">{{ o.amount }}</td>
							<td class="text-center">{{ o.confirmations }}</td>
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
	</div>

	<layout-popup
		title="Add address"
		:visible="false"
		@close="onCloseAddAddress">
		<form class="form-kit popup-form">
			<dl class="form-kit__vertical">
				<dt>Label name</dt>
				<dd>
					<form-text
						type="text"
						name="label"
						id="form_label"
						value=""
						maxlength="20"
						:required="true"
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
					label="Add address"
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
		const { params, error, store, $axios } = cox;
		let result = {
			index: [],
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
		onCloseAddAddress: function()
		{
			console.log('call on close 111');
		},
	},
}
</script>

<style lang="scss" scoped>
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
</style>