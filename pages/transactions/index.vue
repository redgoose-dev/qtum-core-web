<template>
<article class="contents transactions">
	<header class="contents__header">
		<h1>Transactions</h1>
	</header>

	<div class="contents__body">
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
							<td class="text-center" data-name="Date">{{ o.time }}</td>
							<td class="text-center" data-name="Type">
								<strong :class="[
									o.type === 'send' && 'text-error',
									o.type === 'receive' && 'text-success'
								]">{{ o.type }}</strong>
							</td>
							<td class="text-center overflow" data-name="Transaction ID">
								<a v-bind:href="o.txUrl" target="_blank">{{ o.txid }}</a>
							</td>
							<td class="text-center" data-name="Amount">{{ o.amount }}</td>
							<td class="text-center" data-name="Fee">{{ o.fee }}</td>
							<td class="text-center" data-name="Confirm">{{ o.confirm }}</td>
						</tr>
					</template>
					<template v-else>
						<tr class="table__empty">
							<td colspan="6">Not found item</td>
						</tr>
					</template>
					</tbody>
				</table>
			</div>
		</div>

		<button-more :show="!noMore" :loading="!!loading_more" @click="more"/>
	</div>
</article>
</template>


<script src="./index.js"></script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

@media (max-width: $size-mobile) {
	.more-article {
		margin: 20px 0 0;
	}
	.table {
		tr {
			padding: 0 0 20px;
			border-top: none;
			&:hover {
				> td {
					background: none;
					&[data-name='Type'] {
						background: $color-light-gray;
					}
				}
			}
		}
		td {
			padding: 8px 12px 0;
		}
		[data-name='Type'] {
			order: 1;
			font-size: 15px;
			text-transform: uppercase;
			text-align: center;
			padding: 8px 0 7px;
			margin: 0 0 15px;
			background: $color-light-gray;
			&:before {
				display: none;
			}
		}
		[data-name='Date'] {
			order: 2;
		}
		[data-name='Amount'] {
			order: 3;
		}
		[data-name='Fee'] {
			order: 4;
		}
		[data-name='Confirm'] {
			order: 5;
		}
		[data-name='Transaction ID'] {
			order: 10;
			padding-right: 12px;
		}
	}
}
</style>