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
		top: 45px;
		right: 120px;
		padding: 10px 15px;
		background-color: rgb(24, 24, 24);
		border-radius: 20px;
	}

	.errorMessage {
		font-size: 1.2em;
		text-shadow: 0px 0px 10px rgb(31, 31, 31);
		color: rgb(180, 36, 36);
	}

	@media only screen and (max-width: 768px) {
		.errorContainer {
			right: 80px;
		}
	}

	@media only screen and (max-width: 1600px) {
		.errorContainer {
			top: 15px;
			right: 15px;
		}
	}
</style>
