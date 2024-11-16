<template>
	<LoginForm
		mode="login"
		v-model:username="inputUsername"
		v-model:password="inputPassword"
		:submit-event="submitHandler"
	/>
	<p class="errorMessage" v-if="errorMessage.length > 0">{{ errorMessage }}</p>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import router from '../routes';
	import { AuthStore } from '@/stores/authStore';
	import { validateLogin } from '@/services/validator';
	import type { LoginBody } from '@/services/authService';
	import LoginForm from '@/components/loginForm.vue';

	const inputUsername = ref('');
	const inputPassword = ref('');
	const errorMessage = ref('');

	async function submitHandler() {
		try {
			const credentialts: LoginBody = {
				username: inputUsername.value,
				password: inputPassword.value,
			};
			const validation = validateLogin(credentialts);
			if (!validation.success) {
				errorMessage.value = validation.message;
				return;
			}
			const response = await AuthStore.loginUser(credentialts);

			if (!response.success) {
				errorMessage.value = response.message;
				return;
			}
			router.push({ name: 'notesList' });
		} catch (error) {
			console.error('un error');
		}
	}
</script>
