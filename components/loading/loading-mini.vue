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
		},
	},
}
</script>

<style lang="scss" scoped>
@import "~assets/scss/variables";

.loader-mini {
	display: inline-block;
	vertical-align: middle;
	padding: 2px;
	font-size: 0;
	&:after {
		content: '';
		display: inline-block;
		vertical-align: middle;
		width: 12px;
		height: 12px;
		border: 3px solid $color-form-border;
		border-top: 3px solid transparent;
		border-radius: 50%;
		animation: spin 2s linear infinite;
		font-size: 0;
		@keyframes spin {
			0% { transform: rotate(0deg); }
			100% { transform: rotate(360deg); }
		}
	}

	&-color {
		&-key {
			&:after {
				border-color: $color-key;
				border-top-color: transparent;
			}
		}
		&-dark {
			&:after {
				border-color: $color-dark;
				border-top-color: transparent;
			}
		}
		&-white {
			&:after {
				border-color: #fff;
				border-top-color: transparent;
			}
		}
	}
	&-size {
		&-small {
			&:after {
				width: 8px;
				height: 8px;
			}
		}
		&-large {
			&:after {
				width: 16px;
				height: 16px;
			}
		}
	}
}
</style>