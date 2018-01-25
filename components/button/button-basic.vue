<template>
	<button
		:type="type"
		:class="[ 'button', className ]"
		@click="onClick"
		v-if="type === 'button' || type === 'submit'">
		{{ label }}
	</button>
	<a
		:href="href"
		:target="target"
		@click="onClick"
		v-else>
		{{ label }}
	</a>
</template>

<script>
export default {
	props: [
		'type',
		'href',
		'target',
		'label',
		'className'
	],
	computed: {
		isButton() {
			// TODO: 이 부분 테스트 해보기
			return true;
		}
	},
	methods: {
		onClick: function(e)
		{
			this.$emit('click', e);
		}
	},
};
</script>