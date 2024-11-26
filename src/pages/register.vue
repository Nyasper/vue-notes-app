<template>
	<LoginForm
		mode="register"
		v-model:username="inputUsername"
		v-model:password="inputPassword"
		v-model:password2="inputPassword2"
		button-label="Register"
		:submit-event="submitHandler"
	/>
	<ShowError :error />
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import router from '../routes';
	import { AuthStore } from '@/stores/authStore';
	import LoginForm from '@/components/loginForm.vue';
	import { validateRegister } from '@/services/validator';
	import type { RegisterBody } from '@/services/authService';
	import ShowError from '@/components/showError.vue';

	const inputUsername = ref('');
	const inputPassword = ref('');
	const inputPassword2 = ref('');

	const error = ref<string | null>(null);

	async function submitHandler() {
		const credentialts: RegisterBody = {
			username: inputUsername.value,
			password: inputPassword.value,
			password2: inputPassword2.value,
		};

		const validation = validateRegister(credentialts);
		if (!validation.success) {
			error.value = validation.message;
			return;
		}

		await AuthStore.registerUser(credentialts);
		if (!AuthStore.status.success) {
			error.value = AuthStore.status.message;
			return;
		}

		await AuthStore.loginUser(credentialts);
		if (!AuthStore.status.success) {
			error.value = AuthStore.status.message;
			return;
		}

		router.push({ name: 'notesList' });
	}
</script>
