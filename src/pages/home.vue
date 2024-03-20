<template>
	<h1>This is Home</h1>
	<h2>Estado global: {{ store.authState }}</h2>
</template>
<script lang="ts" setup>
	import { useAuthStore } from '../stores/authStore';

	const store = useAuthStore();
</script>
