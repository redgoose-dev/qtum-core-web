/**
 * Transactions
 */

<template>
<article class="contents transactions">
	<header class="contents__header">
		<h1>Transactions</h1>
	</header>

	<div class="contents__body">
		<form action="#" method="get" class="search">
			<fieldset>
				<legend class="blind">filter and search form</legend>
				<div>
					TODO: filter form
				</div>
			</fieldset>
		</form>

		<div class="contents__box">
			<table class="table table-fixed table-border">
				<thead>
				<tr>
					<th scope="col" width="140">Date</th>
					<th scope="col" width="100">Type</th>
					<th scope="col">Transaction ID</th>
					<th scope="col" width="120">Amount</th>
					<th scope="col" width="100">Fee</th>
					<th scope="col" width="100">Confirm</th>
				</tr>
				</thead>
				<tbody>
				<tr v-for="o in transactions">
					<td class="text-center">{{ o.time }}</td>
					<td class="text-center">{{ o.type }}</td>
					<td class="text-center">
						<a v-bind:href="o.txUrl" target="_blank">{{ o.txid }}</a>
					</td>
					<td class="text-center">{{ o.amount }}</td>
					<td class="text-center">{{ o.fee }}</td>
					<td class="text-center">{{ o.confirm }}</td>
				</tr>
				</tbody>
			</table>
		</div>

		<nav v-if="!noMore">
			<button type="button" v-if="!loading_more" v-on:click="more">
				<span>more..</span>
			</button>
			<div v-else>
				<p>LOADING...</p>
			</div>
		</nav>
	</div>
</article>
</template>


<script src="./index.js"></script>