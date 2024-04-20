<template>
	<div id="container">
		<h1>{{ username }} tasks</h1>
		<ul id="taskContainer">
			<taskComponent
				v-for="task in tasks"
				:title="task.title"
				:description="task.description"
				:created="'f'"
				:key="task.id"
				@click.prevent="
					router.push({ name: 'taskDetail', params: { id: task.id } })
				"
			/>
		</ul>
	</div>
</template>

<script setup>
	import { useRoute } from 'vue-router';
	const { username } = useRoute().params;
	import { ref, onMounted } from 'vue';
	import { getAllUsersTasksAdmin } from '../services/adminService';
	import taskComponent from '../components/taskComponent.vue';
	import router from '../routes';

	const tasks = ref([]);
	onMounted(async () => {
		try {
			const response = await getAllUsersTasksAdmin(username);
			console.log({ response });

			tasks.value = response.data;
		} catch (error) {
			console.error(error);
		}
	});
</script>

<style scoped>
	#container {
		display: flex;
		width: 100%;
		flex-flow: column wrap;
		word-wrap: break-word;
		align-items: center;
		justify-content: center;
	}

	#taskContainer {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}

	.task {
		display: flex;
		align-items: center;
		gap: 25px;
		font-size: 16px;
		margin: 10px 15px;
		font-size: 1.5em;
		border: 1px solid white;
		padding: 5px 10px;
		border-radius: 20px;
	}

	.createMessage {
		font-size: 2.5em;
		color: rgb(163, 48, 48);
	}

	.noData {
		text-align: center;
		margin-top: 100px;
		font-size: 4.5em;
	}
</style>
