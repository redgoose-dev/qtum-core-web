<template>
<article class="error">
	<div class="error__wrap">
		<h1>
			<img src="~static/images/ico-off-core.svg" alt="off core">
		</h1>
		<h2>The core is now turned off.</h2>
		<p>To turn on core, please push the following button</p>
		<nav>
			<button-basic
				type="submit"
				:label="processing ? 'Processing..' : 'TURN ON CORE'"
				:disabled="processing"
				className="button-key button-inline"/>
		</nav>
	</div>
</article>
</template>


<script>
import ButtonBasic from '~/components/button/button-basic';

export default {
	components: {
		ButtonBasic,
	},
	asyncData(cox)
	{
		// 코어가 켜져 있으면 첫 페이지로 이동
		if (cox.store.state.status.core)
		{
			cox.redirect('/');
		}

		return {
			processing: false,
		};
	}
}
</script>