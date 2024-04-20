<template>
	<loginForm
		mode="login"
		v-model:username="inputUsername"
		v-model:password="inputPassword"
		:submit-event="submitHandler"
	/>
	<p id="errorMessage" v-if="existsAnError">{{ errorMessage }}</p>
</template>

<script setup>
	import { ref, computed } from 'vue';
	import loginForm from '../components/loginForm.vue';
	import { generateToken } from '../services/userService';
	import { checkLocalTokenValidity } from '../services/axios';
	import router from '../routes';

	const inputUsername = ref('');
	const inputPassword = ref('');
	const loginError = ref(false);

	//error message handler
	const errorMessage = ref('');
	const errorMessageTemplate = 'Error: ';
	const setErrorMessage = (message = '') => {
		errorMessage.value = errorMessageTemplate + message;
	};
	const existsAnError = computed(
		() => errorMessage.value.length > errorMessageTemplate.length
	);

	async function submitHandler() {
		try {
			const credentialts = {
				username: inputUsername.value,
				password: inputPassword.value,
			};
			if (!checkLocalTokenValidity()) {
				await generateToken(credentialts);
				router.push({ name: 'tasksList' });
			}
			router.push({ name: 'tasksList' });

			// window.location.href = '/tasks';
			// const { setUserState } = useAuthStore();
			// setUserState(user);
		} catch (error) {
			console.error(error);

			//ERROR: Invalid Credentialts, try again or register.
			setErrorMessage('Server Error');
		}
	}
</script>

<style scoped>
	#errorMessage {
		color: rgb(180, 36, 36);
		font-size: 1.1em;
		padding: 5px 10px;
	}
</style>
