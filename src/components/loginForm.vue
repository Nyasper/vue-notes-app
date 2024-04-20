<template>
	<form id="formContainer" @submit.prevent="submitEvent">
		<label for="username" style="text-align: center">Username</label>
		<input type="text" name="username" id="username" v-model.trim="username" />
		<label for="password" style="text-align: center">Password</label>
		<input
			type="password"
			name="password"
			id="password"
			v-model.trim="password"
		/>
		<label v-if="mode === 'register'" for="password2" style="text-align: center"
			>Repeat Password</label
		>
		<input
			v-if="mode === 'register'"
			type="password"
			name="password2"
			id="password2"
			v-model.trim="password2"
		/>
		<button type="submit" id="submitButton">
			{{ mode }}
		</button>
	</form>
</template>

<script setup>
	defineProps(['mode', 'submitEvent']);

	const username = defineModel('username');
	const password = defineModel('password');
	const password2 = defineModel('password2');
</script>

<style scoped>
	#formContainer {
		display: flex;
		flex-direction: column;
		width: 100%;
		font-size: 1.3em;
	}

	#username {
		margin: 10px auto;
		width: 30%;
		margin-bottom: 35px;
	}

	#password,
	#password2 {
		margin: 15px auto;
		width: 30%;
	}

	#submitButton {
		display: block;
		width: 225px;
		margin: 40px auto;
	}
</style>
