<template>
<article class="popup" :class="className" v-if="visible">
	<span @click="onClose" class="popup__bg"></span>
	<div class="popup__wrap">
		<header class="popup__header">
			<h1>{{title}}</h1>
			<nav v-if="useClose">
				<button type="button" title="Close" @click="onClose">
					<i class="sp-ico ico-close"></i>
				</button>
			</nav>
		</header>
		<div class="popup__body">
			<slot/>
		</div>
	</div>
</article>
</template>

<script>
export default {
	props: {
		visible: { type: Boolean, default: true },
		title: { type: String, default: 'untitled' },
		useClose: { type: Boolean, default: true },
		className: { type: String, default: null },
	},
	methods: {
		onClose: function()
		{
			this.$emit('close');
		}
	},
	beforeMount()
	{
		document.querySelector('html').classList.add('mode-popup');
	},
	beforeDestroy()
	{
		document.querySelector('html').classList.remove('mode-popup');
	},
};
</script>