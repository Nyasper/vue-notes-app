<script setup lang="ts">
	import taskComponent from '../components/taskComponent.vue';
	import router from '../routes';
	import { useFetch } from '../composables/useFetch';
	import { watch } from 'vue';
	import { TaskStore } from '@/stores/TaskStore';
	import { LoadingStore } from '@/stores/loadingStore';

	const { tasks, error } = TaskStore;
	const { loading } = LoadingStore;

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
	<!-- <h1 v-if="tasks.loading">Loading...</h1> -->
	<h2 v-if="error" class="createMessage">Error: {{ error }}</h2>
	<h2 v-if="loading">Loading...</h2>
	<h2 v-if="!loading && tasks.size === 0" class="createMessage">
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
