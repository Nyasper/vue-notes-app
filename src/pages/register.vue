<template>
	<LoginForm
		mode="register"
		v-model:username="inputUsername"
		v-model:password="inputPassword"
		v-model:password2="inputPassword2"
		button-label="Register"
		:submit-event="submitHandler"
	/>
	<p class="errorMessage" v-if="errorMessage.length > 0">{{ errorMessage }}</p>
</template>

<script setup lang="ts">
	import { ref, computed, watch } from 'vue';
	import router from '../routes';
	import LoginForm from '../components/LoginForm.vue';
	import { AuthStore } from '@/stores/AuthStore';
	import type { RegisterBody } from '@/services/authService';
	import { validateRegister } from '@/services/validator';

	const inputUsername = ref('');
	const inputPassword = ref('');
	const inputPassword2 = ref('');

	const errorMessage = ref('');

	async function submitHandler() {
		try {
			const credentialts: RegisterBody = {
				username: inputUsername.value,
				password: inputPassword.value,
				password2: inputPassword2.value,
			};

			const validation = validateRegister(credentialts);
			if (!validation.success) {
				errorMessage.value = validation.message;
				return;
			}

			const response = await AuthStore.registerUser(credentialts);

			if (!response.success) {
				errorMessage.value = response.message;
				return;
			}

			await AuthStore.loginUser(credentialts);
			router.push({ name: 'notesList' });
		} catch (error) {
			if (error instanceof Error) {
				errorMessage.value = error.message;
				return;
			}
			errorMessage.value = `Error: ${error}`;
		}
	}
</script>
