<template>
	<Transition name="slide-fade">
		<section v-if="!hidden">
			<p :class="NotesStore.status.success ? 'ok' : 'error'">
				{{ NotesStore.status.message }}
			</p>
		</section>
	</Transition>
	<section class="loader" v-if="NotesStore.status.loading.loading">
		<span>loading</span>
		<img src="/loadingSpinner.svg" alt="loader" />
	</section>
</template>

<script setup lang="ts">
	import { NotesStore } from '@/stores/notesStore';
	import { ref, watch, Transition } from 'vue';
	const hidden = ref(true);

	watch(NotesStore.status, () => {
		hidden.value = false;
		let timeout = setTimeout(() => {
			hidden.value = true;
		}, 2000);

		return () => {
			clearTimeout(timeout);
		};
	});
</script>

<style scoped>
	section {
		position: fixed;
		bottom: 60px;
		right: 20px;

		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 15px;

		background-color: rgb(29, 29, 29);
		padding: 5px 15px;
		border-radius: 20px;
		border: 1px solid white;
	}

	p {
		padding: 5px;
		margin: 0;
		img {
			max-height: 20px;
			width: auto;
		}
	}

	.slide-fade-enter-active {
		transition: all 0.3s ease-out;
	}

	.slide-fade-leave-active {
		transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
	}

	.slide-fade-enter-from,
	.slide-fade-leave-to {
		transform: translateX(20px);
		opacity: 0;
	}

	.loader {
		width: max-content;
		background-color: rgb(36, 34, 34);
		bottom: 10px;
	}

	.ok {
		color: green;
	}

	.error {
		color: rgb(151, 41, 41);
	}
</style>
