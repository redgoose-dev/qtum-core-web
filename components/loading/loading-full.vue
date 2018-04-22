<template>
<div
	class="loader-full"
	:class="[
		class_show,
		className,
	]">
	<div class="loader-full__icon"></div>
	<p class="loader-full__message">Loading..</p>
</div>
</template>

<script>
export default {
	props: {
		show: { type: Boolean, default: false },
		className: { type: String },
	},
	computed: {
		class_show: function()
		{
			return this.show ? 'loader-full-active' : null;
		}
	}
}
</script>