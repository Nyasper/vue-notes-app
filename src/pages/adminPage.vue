<template>
	<div v-if="users">
		<h1>All USERS</h1>
		<section id="tableHead">
			<div class="column">
				<h4>User ID</h4>
				<p v-for="user in users">{{ user.id }}</p>
			</div>
			<div class="column">
				<h4>Username</h4>
				<p v-for="user in users">{{ user.username }}</p>
			</div>
			<div class="column">
				<h4>num of notes</h4>
				<p v-for="user in users">{{ user.tasks }}</p>
			</div>
			<div class="column">
				<h4>Is Admin</h4>
				<p v-for="user in users">{{ user.admin === 1 ? 'yes' : '' }}</p>
			</div>
			<div class="column">
				<h4>View Tasks</h4>
				<router-link v-for="user in users" :to="`/admin/${user.username}`"
					>{{ user.username }} tasks</router-link
				>
			</div>
			<div class="column">
				<h4>Delete User</h4>
				<p
					v-for="user in users"
					@click.prevent="deleteButton(user.id, user.username, user.admin)"
					class="deleteButton"
				>
					Delete
				</p>
			</div>
		</section>
	</div>
	<div v-else>
		<h1>NO DATA FOUND</h1>
	</div>
</template>

<script setup>
	// :to="{ name: 'adminDetail', params: { id: user.id } }"
	import { ref, onMounted } from 'vue';
	import { getAllUsers, deleteUserById } from '../services/adminService';

	const users = ref([]);
	onMounted(async () => {
		const response = await getAllUsers();
		console.log(response);
		if (response && response.status === 200) {
			users.value = response.data;
		} else {
			users.value = null;
		}
	});

	async function deleteButton(userId, username, admin) {
		const ask = confirm(`Delete user ${username}?`);
		const isAdmin = admin === 1 ? true : false;
		if (ask && !isAdmin) {
			const response = await deleteUserById(userId);
			if (response.status === 200) {
				window.location.reload();
			} else {
				alert(`Error on deleting user ${username}`);
			}
		}
	}
</script>

<style scoped>
	.user {
		font-size: 1.2em;
		margin: 5px 0;
	}

	#tableHead {
		display: flex;
		flex-direction: row;
	}

	.column {
		display: flex;
		flex-flow: column wrap;
		align-items: center;
		justify-content: baseline;
		margin: 0 5px;
	}
	.column > h4 {
		margin: 5px;
		font-size: 1.8em;
	}
	.column > p,
	.column > a {
		margin: 5px;
	}

	.deleteButton {
		cursor: pointer;
	}
</style>
