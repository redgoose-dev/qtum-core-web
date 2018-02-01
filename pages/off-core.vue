<template>
<article>
	<h1>off core</h1>
	<p>
		TODO: 디자인 및 퍼블리싱작업 필요함
	</p>
</article>
</template>


<script>
export default {
	asyncData(cox)
	{
		// 코어가 켜져 있으면 첫 페이지로 이동
		if (cox.store.state.status.core)
		{
			cox.redirect('/');
		}
	}
}
</script>