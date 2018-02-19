<template>
<article class="contents receive">
	<header class="contents__header">
		<h1>Receive</h1>
	</header>

	<div class="contents__body">
		<nav class="text-right">
			<button type="button">Add address</button>
		</nav>
		<div class="contents__box">
			<div class="table__responsive table__responsive-border">
				<table class="table">
					<thead>
					<tr>
						<th scope="col">Label</th>
						<th scope="col">Address</th>
						<th scope="col">Amount</th>
						<th scope="col">Confirm</th>
						<th scope="col"></th>
					</tr>
					</thead>
					<tbody>
					<template v-if="index.length">
						<tr v-for="o in index">
							<td class="text-center">
								<strong class="text-brackets-quotes">{{ o.label }}</strong>
							</td>
							<td>{{ o.address }}</td>
							<td class="text-center">{{ o.amount }}</td>
							<td class="text-center">{{ o.confirmations }}</td>
							<td class="text-center">
								<button type="button">Edit</button>
								<button type="button">QR Code</button>
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
	</div>

	<layout-popup
		title="Add address"
		:visible="true"
		@close="onClosePopup"
	>
		<p style="margin: 0;">
			bodmipsdgmpsdmgpsdmgsdgkjospdkgpsdgkpsdkogpdkg sdkgosdfg,dog kdsgksdog ksd[ogksdgko sdkgopsdkg opsdkgops dkogpsdmpgm sdpgmsdy
		</p>
	</layout-popup>
</article>
</template>


<script>
import * as lib from '../../lib';
import ButtonBasic from '~/components/button/button-basic';
import LayoutPopup from '~/components/layout/layout-popup';

export default {
	components: {
		ButtonBasic,
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
		onClosePopup: function()
		{
			console.log('call on close 111')
		}
	},
}
</script>