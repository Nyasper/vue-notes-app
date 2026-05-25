<template>
	<Navbar />
	<ToastContainer />
	<LoadingComponent :loading />
	<main id="mainContainer">
		<RouterView />
	</main>

</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import LoadingComponent from './components/loadingComponent.vue';
	import Navbar from './components/navbar.vue';
	import ToastContainer from './components/toastContainer.vue';
	import { AuthStore } from './stores/authStore';
	import { NotesStore } from './stores/notesStore';

	const loading = computed(() => {
		const authLoading = AuthStore.status.loading.loading;
		const notesLoading = NotesStore.status.loading.loading;

		return authLoading || notesLoading;
	});
</script>

<style scoped>
	/* Page transitions */
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.fade-enter-from {
		opacity: 0;
		transform: translateY(8px);
	}

	.fade-leave-to {
		opacity: 0;
		transform: translateY(-8px);
	}
</style>


