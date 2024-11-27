<template>
	<Navbar />
	<StatusBar />
	<LoadingComponent :loading />
	<main id="mainContainer">
		<RouterView />
	</main>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import LoadingComponent from './components/loadingComponent.vue';
	import Navbar from './components/navbar.vue';
	import StatusBar from './components/statusBar.vue';
	import { AuthStore } from './stores/authStore';
	import { NotesStore } from './stores/notesStore';

	const loading = computed(() => {
		const authLoading = AuthStore.status.loading.loading;
		const notesLoading = NotesStore.status.loading.loading;

		return authLoading || notesLoading;
	});
</script>
