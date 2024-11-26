<template>
	<LoginForm
		mode="login"
		v-model:username="inputUsername"
		v-model:password="inputPassword"
		:submit-event="submitHandler"
	/>
	<ShowError :error />
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import router from '../routes';
	import { AuthStore } from '@/stores/authStore';
	import { validateLogin } from '@/services/validator';
	import type { LoginBody } from '@/services/authService';
	import LoginForm from '@/components/loginForm.vue';
	import ShowError from '@/components/showError.vue';
	import { NotesStore } from '@/stores/notesStore';

	const inputUsername = ref('');
	const inputPassword = ref('');

	const error = ref<string | null>(null);

	async function submitHandler(): Promise<void> {
		const credentialts: LoginBody = {
			username: inputUsername.value,
			password: inputPassword.value,
		};
		const validation = validateLogin(credentialts);
		if (!validation.success) {
			error.value = validation.message;
			return;
		}
		await AuthStore.loginUser(credentialts);
		await NotesStore.getData();
		if (!AuthStore.status.success) {
			error.value = AuthStore.status.message;
			return;
		}
		router.push({ name: 'notesList' });
	}
</script>
