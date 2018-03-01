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

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.popup {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	z-index: 100;
	background: rgba(255,255,255,.5);
	display: flex;
	align-items: center;
	justify-content: center;
	&__bg {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: transparent;
	}
	&__wrap {
		position: relative;
		background: #fff;
		border-radius: 3px;
		box-shadow: 0 2px 8px rgba(0,0,0,.2);
		min-width: 300px;
	}
	&__header {
		background: $color-dark;
		display: flex;
		height: 44px;
		align-items: center;
		h1 {
			flex: 1;
			margin: 0;
			padding: 0 15px 0 15px;
			color: #fff;
			font-size: 16px;
			font-weight: 600;
		}
		nav {
			height: 100%;
			button {
				display: block;
				background: none;
				border: none;
				margin: 0;
				padding: 0 15px;
				font-size: 0;
				height: 100%;
				cursor: pointer;
				&:focus {
					outline: $border-focus;
				}
			}
		}
	}
	&__body {
		padding: 30px;
	}

	@media (max-width: $size-mobile) {
		&__body {
			padding: 20px 20px;
		}
	}
}
</style>