<template>
	<section v-if="loading" class="mainContainer">
		<div class="container">
			<img src="/loadingSpinner.svg" alt="loadingIcon" />
			<span>loading</span>
		</div>
	</section>
</template>

<script setup lang="ts">
	const { loading } = defineProps<Props>();

	interface Props {
		loading: boolean;
	}
</script>

<style scoped>
	.mainContainer {
		display: flex;
		position: fixed;
		align-items: center;
		justify-content: center;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(41, 41, 41, 0.7);
		backdrop-filter: blur(40px);
		box-shadow: 0px 25.6px 57.6px rgb(0 0 0 / 14%),
			0px 0px 16.4px rgb(0 0 0 / 12%);

		.container {
			display: flex;
			flex-direction: column;
			padding: 15px;
			border-radius: 40px;
			background-color: rgb(27, 27, 27);

			span {
				font-size: 1.2em;
			}
		}
	}
</style>
