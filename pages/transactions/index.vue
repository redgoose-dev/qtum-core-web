/**
 * Transactions
 */

<template>
<article class="contents transactions">
	<header class="contents__header">
		<h1>Transactions</h1>
	</header>

	<div class="contents__body">
		<form action="#" method="get" class="search" v-if="false">
			<fieldset>
				<legend class="blind">filter and search form</legend>
				<div>
					TODO: filter form
				</div>
			</fieldset>
		</form>

		<div class="contents__box">
			<div class="table__responsive table__responsive-border">
				<table class="table table-fixed">
					<thead>
					<tr>
						<th scope="col" width="140">Date</th>
						<th scope="col" width="80">Type</th>
						<th scope="col" width="180">Transaction ID</th>
						<th scope="col" width="120">Amount</th>
						<th scope="col" width="100">Fee</th>
						<th scope="col" width="100">Confirm</th>
					</tr>
					</thead>
					<tbody>
					<template v-if="transactions.length">
						<tr v-for="o in transactions">
							<td class="text-center">{{ o.time }}</td>
							<td class="text-center">{{ o.type }}</td>
							<td class="text-center overflow">
								<a v-bind:href="o.txUrl" target="_blank">{{ o.txid }}</a>
							</td>
							<td class="text-center">{{ o.amount }}</td>
							<td class="text-center">{{ o.fee }}</td>
							<td class="text-center">{{ o.confirm }}</td>
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

		<button-more
			:show="!noMore"
			:loading="!!loading_more"
			@click="more"/>
	</div>
</article>
</template>


<script src="./index.js"></script>