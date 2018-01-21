<template>
	<article class="contents">
		<header class="contents__header">
			<h1>Components guide</h1>
		</header>

		<div class="contents__body">
			<p>
				.contents
			</p>

			<p>
				input: <input type="text" v-model="message">
			</p>
			<hr>
			<p>
				component: <form-text :message="message"/>
			</p>
			<hr>
			<p>
				text: {{ message }}
			</p>
		</div>
	</article>
</template>


<script>
import FormText from '~/components/forms/form-text';

export default {
	data: function()
	{
		return {
			message: '11'
		};
	},
	components: {
		FormText
	},
}
</script>