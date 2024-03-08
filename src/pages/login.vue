<template>
	<loginForm
		v-model:username="inputUsername"
		v-model:password="inputPassword"
		button-label="Login"
		:submit-button="buttonLogin"
	/>
	<p id="errorMessage" v-if="loginError">
		ERROR: Invalid Credentialts, try again or
		<router-link to="/register">register.</router-link>
	</p>
</template>

<script setup>
	import { ref } from 'vue';
	import loginForm from '../components/loginForm.vue';
	import { login } from '../services/userService';
	import router from '../routes';

	const inputUsername = ref('');
	const inputPassword = ref('');
	const loginError = ref(false);

	async function buttonLogin() {
		try {
			const credentialts = {
				username: inputUsername.value,
				password: inputPassword.value,
			};
			const { status } = await login(credentialts);
			if (status === 200) {
				router.push({ name: 'tasksList' });
			} else throw new Error('ERROR on Login:');
		} catch (error) {
			console.error(error);
			loginError.value = true;
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
