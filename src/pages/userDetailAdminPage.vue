<template>
	<div id="container">
		<h1>{{ username }} tasks</h1>
		<ul>
			<li v-for="task in tasks">
				<router-link
					:to="{ name: 'adminTaskDetail', params: { id: task.taskid } }"
					class="task"
				>
					{{ task.title }}
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script setup>
	import { useRoute } from 'vue-router';
	const { username } = useRoute().params;
	import { ref, onMounted } from 'vue';
	import { getAllUsersTasksAdmin } from '../services/adminService';

	const tasks = ref([]);
	onMounted(async () => {
		const response = await getAllUsersTasksAdmin(username);
		console.log(response);
		if (response && response.status === 200) {
			tasks.value = response.data;
		} else {
			response.status = null;
		}
	});
</script>

<style scoped>
	#container {
		width: 100%;
		display: flex;
		flex-flow: column wrap;
		align-items: center;
		justify-content: center;
	}

	li {
		margin: 20px 0;
		height: max-content;
	}
	.task {
		margin: 5px 0;
		font-size: 1.5em;
		border: 1px solid white;
		padding: 5px 10px;
		border-radius: 20px;
	}
</style>
