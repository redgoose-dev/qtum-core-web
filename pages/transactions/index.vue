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
								]">
									{{ o.type }}
								</strong>
							</td>
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
.table {
	/*[data-name='Date'] {*/
		/*background: lime;*/
		/*&:before {*/
			/*content: attr(data-name)': ';*/
		/*}*/
	/*}*/
	@media (max-width: $size-mobile) {
		display: block;
		width: auto;
		thead {
			display: none;
		}
		tbody {
			display: block;
			vertical-align: inherit;
			tr {
				display: block;
			}
		}
		&__responsive {
			overflow: inherit;
			&-border {
				border: none;
			}
		}
	}
}
</style>