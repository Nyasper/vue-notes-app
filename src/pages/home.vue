<template>
	<h1>This is Home</h1>
</template>
<script lang="ts" setup>
	import { useAuthStore } from '../stores/authStore';

	const store = useAuthStore();
</script>
