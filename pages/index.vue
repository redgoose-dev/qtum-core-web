<template>
	<div>
		<h1>index</h1>
		<p>TODO: 하위 컴포넌트로 dashboard가 나오도록...</p>
		<ul>
			<li>
				<router-link to="/transactions">/transactions</router-link>
			</li>
		</ul>
	</div>
</template>


<script>
export default {
	async asyncData({ params }) {
		let aa = 1;
		let bb = 2;
		return { foo: 'bar', asd: aa + bb };
	},
}
</script>
