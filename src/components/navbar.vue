<template>
	<nav>
		<ul id="navContainer">
			<li>
				<router-link class="anchorItem" :to="{ name: 'home' }">
					Home
				</router-link>
			</li>
			<li v-if="loginState">
				<router-link class="anchorItem" :to="{ name: 'tasksList' }">
					My Notes
				</router-link>
			</li>
			<li v-if="loginState">
				<router-link class="anchorItem" :to="{ name: 'taskCreate' }">
					Create Note
				</router-link>
			</li>
			<li v-if="!loginState">
				<router-link class="anchorItem" :to="{ name: 'login' }">
					Login
				</router-link>
			</li>
			<li v-if="!loginState">
				<router-link class="anchorItem" :to="{ name: 'register' }">
					Register
				</router-link>
			</li>
			<li v-if="adminState">
				<router-link class="anchorItem" :to="{ name: 'admin' }">
					Admin
				</router-link>
			</li>
			<li v-if="loginState" @click="logoutButton" class="logoutButton">
				<p class="anchorItem">Logout</p>
			</li>
			<li>
				<router-link :to="{ name: 'about' }" class="anchorItem">
					About
				</router-link>
			</li>
		</ul>
	</nav>
</template>

<script setup>
	import { storeToRefs } from 'pinia';
	import { useLogin } from '../stores/loginState';
	import { logout } from '../services/userService';

	const store = useLogin();
	const { loginState, adminState } = storeToRefs(store);

	async function logoutButton() {
		const ask = confirm('Logout?');
		if (ask) {
			const response = await logout();
			if (response.status === 200) {
				window.location.href = '/login';
			}
		}
	}
</script>

<style scoped>
	#navContainer {
		height: 100px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		width: max-content;
		margin-top: 20px;
		margin-bottom: 70px;
		margin-left: auto;
		margin-right: auto;
		background-color: rgb(27, 27, 27);
		border-radius: 20px;
	}

	#navContainer > li,
	.logoutButton {
		height: 100%;
		display: flex;
		align-items: center;
	}

	.anchorItem {
		font-size: 2rem;
		padding: 2px 8px;
		margin: 0 20px;
		border-bottom: 2px rgba(0, 0, 0, 0) solid;
		border-radius: 8px;
	}

	.anchorItem:hover {
		border-bottom: 2px white solid;
		transition: 0.35s ease all;
	}

	.logoutButton {
		cursor: pointer;
	}
</style>
