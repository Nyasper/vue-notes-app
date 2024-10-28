<script setup lang="ts">
	import taskComponent from '../components/taskComponent.vue';
	import router from '../routes';
	import { useFetch } from '../composables/useFetch';
	import { watch, watchEffect } from 'vue';
	// const tasks = ref<Task[]>([]);
	// const loading = ref(false);
	// const errorMessage = ref<string>('');

	const { data: tasks, error, computado } = useFetch('');

	// onMounted(async () => {
	// 	loading.value = true;
	// 	try {
	// tasks.value = await getAllTasks();
	// 	} catch (error) {
	// 		if (error instanceof Error) {
	// 			errorMessage.value = error.message;
	// 		}
	// 	}
	// });

	function obtainDate(date?: string) {
		if (!date) return '';
		const myDate = new Date(date);

		const day = myDate.getDate();
		const month = myDate.getMonth() + 1;
		const year = myDate.getFullYear();
		const hour = myDate.getHours();
		const minutes = myDate.getMinutes();
		return `${day}/${month}/${year} - ${hour}:${minutes}`;
	}

	watch(tasks, () => {
		console.log('task cambio:', tasks);
	});
</script>

<template>
	<h1>All Notes {{ computado }}</h1>
	<!-- <h1 v-if="tasks.loading">Loading...</h1> -->
	<h2 v-if="tasks.size === 0" class="createMessage">
		There are no tasks created, start by
		<router-link :to="{ name: 'taskCreate' }">creating one</router-link>
	</h2>
	<div v-if="error">
		<h2 class="createMessage">Error: {{ error }}</h2>
	</div>
	<ul id="taskContainer">
		<taskComponent
			v-for="[id, task] in tasks"
			:title="task.title"
			:description="task.description"
			:createdAt="obtainDate(task.createdAt)"
			:key="id"
			@click.prevent="router.push({ name: 'taskDetail', params: { id } })"
		/>
	</ul>
</template>

<style>
	.createMessage {
		font-size: 2.5em;
		color: rgb(163, 48, 48);
	}

	.noData {
		text-align: center;
		margin-top: 100px;
		font-size: 4.5em;
	}
	#taskContainer {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}
</style>
