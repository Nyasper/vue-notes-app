<template>
	<div id="taskDetailContainer" v-if="task">
		<singleTaskComponent
			:task-title="task?.title"
			:task-description="task?.description"
		/>
		<div id="inputsContainer">
			<div class="labelContainer">
				<label for="title">Title {{ task?.title.length }}/60</label>
				<input
					type="text"
					name="title"
					id="title"
					v-model="task.title"
					required
					maxlength="60"
				/>
			</div>
			<div class="labelContainer">
				<label for="description">Description</label>
				<textarea
					name="description"
					id="description"
					v-model="task.description"
					cols="30"
					rows="10"
					required
				></textarea>
			</div>
			<div id="buttonsContainer">
				<button @click="updateTaskFunc">Update Note</button>
				<button @click="cancelButton" :disabled="task === defaultTask">
					Cancel
				</button>
				<button @click="deleteTask">Delete Note</button>
			</div>
		</div>
	</div>
	<div v-else>
		<h2>ERROR 404 NO DATA FOUND.</h2>
	</div>
</template>

<script setup>
	import {
		getTaskById,
		deleteTaskById,
		updateTask,
	} from '../services/taskService';
	import router from '../routes';
	import { useRoute } from 'vue-router';
	import { onMounted, ref } from 'vue';
	import singleTaskComponent from '../components/singleTaskComponent.vue';

	const { id: taskId } = useRoute().params;

	const task = ref(null);
	let defaultTask = null;

	onMounted(async () => {
		const { data } = await getTaskById(taskId);
		task.value = data;
		defaultTask = {
			title: data.title,
			description: data.description,
		};
	});

	task.title = ref(task.title);
	task.description = ref(task.description);

	async function updateTaskFunc() {
		try {
			const taskUpdated = {
				id: taskId,
				title: task.value.title,
				description: task.value.description,
			};
			console.log('enviando:', taskUpdated);
			const response = await updateTask(taskUpdated);
			console.log(response);
			if (response.status === 200) router.push('/tasks');
		} catch (error) {
			console.error('Error on updating task', error);
			location.reload();
		}
	}

	async function deleteTask() {
		try {
			const response = await deleteTaskById(taskId);
			if (response.status === 200) router.push('/tasks');
		} catch (error) {
			console.error('Error on delete task');
			location.reload();
		}
	}

	function cancelButton() {
		if (defaultTask) {
			task.value.title = defaultTask.title;
			task.value.description = defaultTask.description;
		}
	}
</script>

<style scoped>
	#taskDetailContainer {
		width: 100%;
		display: flex;
		justify-content: space-around;
		font-size: 1.2em;
	}

	#inputsContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 40%;
	}

	.labelContainer {
		margin: 20px 0;
		width: 100%;
	}
	.labelContainer > label {
		display: block;
		text-align: center;
		font-size: 1.2em;
		padding: 5px;
	}
	.labelContainer > input,
	.labelContainer > textarea {
		display: block;
		width: 70%;
		height: 35px;
		padding: 5px 10px;
		font-size: 1.4em;
		margin: 0 auto;
	}
	#title {
		padding: 10px;
	}

	#description {
		min-height: 250px;
		padding: 15px;
	}

	#buttonsContainer {
		display: block;
		margin: 0 auto;
	}

	#buttonsContainer > button {
		margin: 0 5px;
	}
</style>
