<template>
<article class="contents transactions">
	<header class="contents__header">
		<h1>{{$lang.out('transactions.title')}}</h1>
	</header>

	<div class="contents__body">
		<div class="contents__box">
			<div class="table__responsive table__responsive-border">
				<table class="table table-fixed">
					<thead>
					<tr>
						<th scope="col" width="140">{{$lang.out('global.date')}}</th>
						<th scope="col" width="80">{{$lang.out('global.type')}}</th>
						<th scope="col" width="180">{{$lang.out('global.transactionId')}}</th>
						<th scope="col" width="120">{{$lang.out('global.amount')}}</th>
						<th scope="col" width="100">{{$lang.out('global.fee')}}</th>
						<th scope="col" width="100">{{$lang.out('global.confirm')}}</th>
					</tr>
					</thead>
					<tbody>
					<template v-if="transactions.length">
						<tr v-for="o in transactions">
							<td class="text-center" data-name="Date">{{ o.time }}</td>
							<td class="text-center" data-name="Type">
								<strong :class="[
									'text-uppercase',
									o.type === 'send' && 'text-error',
									o.type === 'receive' && 'text-success'
								]">{{$lang.out(`global.${o.type}`)}}</strong>
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
							<td colspan="6">{{$lang.out('message.notFoundItem')}}</td>
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