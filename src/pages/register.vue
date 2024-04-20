<template>
	<loginForm
		mode="register"
		v-model:username="inputUsername"
		v-model:password="inputPassword"
		v-model:password2="inputPassword2"
		button-label="Register"
		:submit-event="actionRegister"
	/>
	<p id="errorMessage" v-if="existsAnError">{{ errorMessage }}</p>
</template>

<script setup>
	import { ref, computed, watch } from 'vue';
	import { register, generateToken } from '../services/userService';
	import router from '../routes';
	import loginForm from '../components/loginForm.vue';

	const inputUsername = ref('');
	const inputPassword = ref('');
	const inputPassword2 = ref('');

	//error message handler
	const errorMessage = ref('');
	const errorMessageTemplate = 'Error: ';
	const setErrorMessage = (message = '') => {
		errorMessage.value = errorMessageTemplate + message;
	};
	const existsAnError = computed(
		() => errorMessage.value.length > errorMessageTemplate.length
	);

	async function actionRegister() {
		try {
			const credentialts = {
				username: inputUsername.value,
				password: inputPassword.value,
				password2: inputPassword2.value,
			};
			if (credentialts.password !== credentialts.password2) {
				setErrorMessage("passwords doesn't match, please verify.");
			}
			await register(credentialts);
			await generateToken(credentialts);
			router.push({ name: 'tasksList' });
		} catch (error) {
			const errorCodeNumber = error.response.status;
			if (errorCodeNumber === 409) {
				setErrorMessage(`userame alredy taken, try again or
				login.`);
			}
			console.error('Error on Register:', error);
			setErrorMessage('server Error.');
		}
	}
	//delete error message after 10s
	watch(errorMessage, (e) => {
		setInterval(() => {
			errorMessage.value = '';
		}, 10000);
	});
</script>

<style scoped>
	#errorMessage {
		color: rgb(180, 36, 36);
		font-size: 1.1em;
		padding: 5px 10px;
	}
</style>
