<template>
	<loginForm
		v-model:username="inputUsername"
		v-model:password="inputPassword"
		button-label="Register"
		:submit-button="buttonRegister"
	/>
	<p id="errorMessage" v-if="registerError">
		ERROR: Userame alredy taken, try again or
		<router-link to="/login">login.</router-link>
	</p>
</template>

<script setup>
	import { ref } from 'vue';
	import loginForm from '../components/loginForm.vue';
	import { register, login } from '../services/userService';
	import router from '../routes';

	const inputUsername = ref('');
	const inputPassword = ref('');
	const registerError = ref(false);

	async function buttonRegister() {
		try {
			const credentialts = {
				username: inputUsername.value,
				password: inputPassword.value,
			};
			const { status: registerStatus } = await register(credentialts);
			if (registerStatus === 201) {
				const { status: loginStatus } = await login(credentialts);
				if (loginStatus === 200) router.push({ name: 'tasksList' });
			} else throw new Error('ERROR on register');
		} catch (error) {
			console.error(error);
			registerError.value = true;
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
