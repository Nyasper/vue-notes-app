<template>
	<li class="task">
		<h2>{{ title }}</h2>
		<p>{{ description }}</p>
		<span v-if="createdAt" id="created">{{ createdAt }}</span>
	</li>
</template>

<script setup lang="ts">
	import type { Task } from '../models/task';

	const { title, description, createdAt } = defineProps<Props>();

	interface Props {
		title: string;
		description: string;
		createdAt: string;
	}
</script>

<style scoped>
	.task {
		background-color: rgb(27, 27, 27);
		padding: 10px;
		margin: 20px;
		width: 260px;
		height: 300px;
		border: 2px solid white;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		border-radius: 20px;
		transition: all 0.05s;
	}

	#taskContainer > .task:hover {
		background-color: rgb(0, 0, 0);
		cursor: pointer;
		scale: 1.2;
		transition: all 0.04s;
	}

	.task > h2 {
		height: 20%;
	}

	.task > p {
		height: 80%;
	}
</style>
