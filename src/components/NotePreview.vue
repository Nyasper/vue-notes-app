<template>
	<section class="taskComponentContainer">
		<h2 class="noteTitle">{{ title }}</h2>
		<p class="noteDescription">{{ description }}</p>
	</section>
</template>

<script setup lang="ts">
	const { title, description } = defineProps<Props>();
	
	interface Props {
		title?: string;
		description?: string;
	}
</script>

<style scoped>
	.taskComponentContainer {
		border: 2px solid white;
		width: 60%;
		overflow: auto;
		border-radius: 20px;
		padding: 10px 15px;
		margin-right: 100px;
		/* min-width: 80px; */
	}

	.noteTitle {
		text-align: center;
		font-size: 1.6em;
		margin: 15px 0;
	}
	.noteDescription {
		margin-top: 30px;
		font-size: 1.5em;
		word-wrap: break-word;
		line-height: 1.3;
	}

	@media only screen and (max-width: 768px) {
		.taskComponentContainer {
			display: none;
		}
	}
</style>
