<template>
	<AdminTable :adminData :deleteUserFunc />
</template>

<script setup lang="ts">
	import AdminTable from '@/components/AdminTable.vue';
	import { AdminStore } from '@/stores/AdminStore';
	const { adminData } = AdminStore;

	async function deleteUserFunc(id: string) {
		const ask = confirm(`Delete user with ID: '${id}' ?`);
		if (!ask) return;
		await AdminStore.deleteUser(id);
		alert(`user '${id}' deleted.`);
	}
</script>
