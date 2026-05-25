<template>
	<Transition name="fade">
		<section v-if="loading" class="mainContainer">
			<div class="container">
				<img src="/loadingSpinner.svg" alt="loadingIcon" class="spinner" />
				<span>loading</span>
			</div>
		</section>
	</Transition>
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
		background-color: rgba(20, 20, 20, 0.7);
		backdrop-filter: blur(15px);
		-webkit-backdrop-filter: blur(15px);
		box-shadow: 0px 25.6px 57.6px rgb(0 0 0 / 20%),
			0px 0px 16.4px rgb(0 0 0 / 15%);
		z-index: 99999; /* make sure loader covers everything */

		.container {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 15px;
			padding: 30px 40px;
			border-radius: 20px;
			background-color: rgb(27, 27, 27);
			border: 1px solid rgba(255, 255, 255, 0.1);
			box-shadow: 0 10px 25px rgba(0,0,0,0.5);

			img {
				width: 50px;
				height: 50px;
			}

			span {
				font-size: 1.2em;
				letter-spacing: 1px;
				text-transform: uppercase;
				font-weight: 600;
				color: #ccc;
			}
		}
	}

	/* Fade transitions */
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s ease, backdrop-filter 0.3s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>

