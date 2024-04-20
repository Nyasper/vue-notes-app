<template>
	<nav>
		<ul id="navContainer">
			<li>
				<router-link class="anchorItem" :to="{ name: 'home' }">
					Home
				</router-link>
			</li>
			<li v-if="userState?.id && userState?.username">
				<router-link class="anchorItem" :to="{ name: 'tasksList' }">
					My Notes
				</router-link>
			</li>
			<li v-if="userState?.id && userState?.username">
				<router-link class="anchorItem" :to="{ name: 'taskCreate' }">
					Create Note
				</router-link>
			</li>
			<li v-if="!userState">
				<router-link class="anchorItem" :to="{ name: 'login' }">
					Login
				</router-link>
			</li>
			<li v-if="!userState">
				<router-link class="anchorItem" :to="{ name: 'register' }">
					Register
				</router-link>
			</li>
			<li v-if="userState?.id && userState?.username && userState?.admin">
				<router-link class="anchorItem" :to="{ name: 'admin' }">
					Admin
				</router-link>
			</li>
			<li
				v-if="userState?.id && userState?.username"
				@click="logoutButton"
				class="logoutButton"
			>
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
	import { useAuthStore } from '../stores/authStore';
	import { storeToRefs } from 'pinia';
	import { logout } from '../services/userService';

	const store = useAuthStore();
	const { userState } = storeToRefs(store);
	import router from '../routes';

	async function logoutButton() {
		const ask = confirm('Logout?');
		if (ask) {
			const response = logout();
			if (response?.status === 200) {
				router.push({ name: 'login' });
			}
		}
	}

	//no pude hacerlo
	/*

	<li v-for="(link, key) in updatedLinks">
				<router-link class="anchorItem" :key="key" :to="link.path">
					{{ link.name }}
				</router-link>
			</li>
	interface links {
		name: string;
		path: { name: string };
		condition: boolean;
	}
	
		const rawsLinks = [
		{ name: 'Home', path: { name: 'home' }, condition: true },
		{
			name: 'My Notes',
			path: { name: 'tasksList' },
			condition: authState.value?.logged,
		},
		{
			name: 'Create Note',
			path: { name: 'taskCreate' },
			condition: true,
		},
		{ name: 'Login', path: { name: 'login' }, condition: true },
		{ name: 'Register', path: { name: 'register' }, condition: true },
		{ name: 'Admin', path: { name: 'admin' }, condition: false },
	];

	const links = ref(rawsLinks);

	console.log('estados:', {
		loginState: authState.value?.logged,
		adminState: authState.value?.admin,
	});
	const updatedLinks = computed(() =>
		links.value.filter((link) => link.condition)
	);

	*/
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
