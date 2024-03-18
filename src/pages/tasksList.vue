<script setup>
	import taskComponent from '../components/taskComponent.vue';
	import { viewAllTasks } from '../services/taskService';
	import router from '../routes';
	import { ref, onMounted } from 'vue';

	const tasks = ref({ loading: true, data: [] });

	onMounted(async () => {
		const response = await viewAllTasks();
		if (response && response.status === 200) {
			tasks.value.data = response.data;
			tasks.value.loading = false;
		} else {
			tasks.value = null;
		}
	});

	function obtainDate(date) {
		const myDate = new Date(date);

		const day = myDate.getDate();
		const month = myDate.getMonth() + 1;
		const year = myDate.getFullYear();
		const hour = myDate.getHours();
		const minutes = myDate.getMinutes();
		return `${day}/${month}/${year} - ${hour}:${minutes}`;
	}
</script>

<template>
	<div v-if="tasks">
		<h1>All Notes</h1>
		<h1 v-if="tasks.loading">Loading...</h1>
		<h2
			v-else-if="!tasks.loading && tasks.data.length === 0"
			class="createMessage"
		>
			There are no tasks created, start by
			<router-link :to="{ name: 'taskCreate' }">creating one</router-link>
		</h2>
		<ul id="taskContainer" v-else>
			<taskComponent
				v-for="task in tasks.data"
				:title="task.title"
				:description="task.description"
				:created="obtainDate(task.createdAt)"
				:key="task.id"
				@click.prevent="
					router.push({ name: 'taskDetail', params: { id: task.id } })
				"
			/>
		</ul>
	</div>
	<div v-else>
		<h1 class="noData">Something went wrong</h1>
	</div>
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
