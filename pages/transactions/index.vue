<template>
<article class="contents transactions">
	<header class="contents__header transactions__header">
		<h1>Transactions</h1>
	</header>

	<div class="contents__body">
		<form action="#" method="get" class="search" style="display: none;">
			<fieldset>
				<legend class="blind">filter and search form</legend>
				<div>

				</div>
			</fieldset>
		</form>

		<div class="contents__box">
			<table class="index-table index-table-center">
				<thead>
				<tr>
					<th scope="col" width="">Date</th>
					<th scope="col" width="">Type</th>
					<th scope="col" width="">Transaction ID</th>
					<th scope="col" width="">Amount</th>
					<th scope="col" width="">Fee</th>
					<th scope="col" width="">Confirm</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>0000-00-00 00:00</td>
					<td>Send</td>
					<td><a href="#">53j0uernugu954yuengero</a></td>
					<td>0.000000</td>
					<td>0.0000</td>
					<td>12345</td>
				</tr>
				<tr>
					<td>0000-00-00 00:00</td>
					<td>Send</td>
					<td><a href="#">53j0uernugu954yuengero</a></td>
					<td>0.000000</td>
					<td>0.0000</td>
					<td>12345</td>
				</tr>
				<tr>
					<td>0000-00-00 00:00</td>
					<td>Send</td>
					<td><a href="#">53j0uernugu954yuengero</a></td>
					<td>0.000000</td>
					<td>0.0000</td>
					<td>12345</td>
				</tr>
				<tr>
					<td>0000-00-00 00:00</td>
					<td>Send</td>
					<td><a href="#">53j0uernugu954yuengero</a></td>
					<td>0.000000</td>
					<td>0.0000</td>
					<td>12345</td>
				</tr>
				<tr>
					<td>0000-00-00 00:00</td>
					<td>Send</td>
					<td><a href="#">53j0uernugu954yuengero</a></td>
					<td>0.000000</td>
					<td>0.0000</td>
					<td>12345</td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>

</article>
</template>


<script>
import * as lib from '~/lib';

export default {
	head: {
		title: lib.util.makeTitle('Transactions')
	},
	middleware: 'transactions',
	methods: {
		back: function(e)
		{
			this.$router.go(-1);
		}
	},
}
</script>