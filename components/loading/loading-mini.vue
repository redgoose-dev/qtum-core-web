<template>
<span
	class="loader-mini"
	:class="[
		class_color,
		class_size,
		className,
	]">
	loading
</span>
</template>

<script>
export default {
	props: {
		color: { type: String },
		size: { type: String },
		className: { type: String },
	},
	computed: {
		class_color: function()
		{
			switch(this.color)
			{
				case 'key':
					return 'loader-mini-color-key';
				case 'dark':
					return 'loader-mini-color-dark';
				case 'white':
					return 'loader-mini-color-white';
				default:
					return null;
			}
		},
		class_size: function()
		{
			switch(this.size)
			{
				case 'small':
					return 'loader-mini-size-small';
				case 'large':
					return 'loader-mini-size-large';
				default:
					return null;
			}
		}
	}
}
</script>