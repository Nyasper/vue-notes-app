<template>
	<article v-if="error !== null && error.length > 0" class="errorContainer">
		<span class="errorMessage">
			{{ error }}
		</span>
	</article>
</template>

<script setup lang="ts">
	const { error } = defineProps<Props>();

	interface Props {
		error: string | null;
	}
</script>

<style scoped>
	.errorContainer {
		position: fixed;
		bottom: 50px;

		padding: 10px 15px;
		background-color: rgb(24, 24, 24);
		border-radius: 20px;
	}

	.errorMessage {
		position: relative;
		text-align: center;
		font-size: 1.2em;
		text-shadow: 0px 0px 10px rgb(31, 31, 31);

		color: rgb(180, 36, 36);
	}

	@media only screen and (max-width: 768px) {
		.errorContainer {
			right: 120px;
			top: 15px;
			bottom: auto;
		}
	}
</style>
