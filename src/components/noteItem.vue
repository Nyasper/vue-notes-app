<template>
	<li class="note">
		<h2>{{ note.title }}</h2>
		<p>{{ note.description }}</p>
		<span v-if="note.created" id="created">{{ formattedDate }}</span>
	</li>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import { getFormattedDate } from '@/services/utils';
	import type { Note } from '@/models/notes.model.';

	const { note } = defineProps<Props>();
	const formattedDate = computed(() => getFormattedDate(note.created));

	interface Props {
		note: Note;
	}
</script>

<style scoped>
	.note {
		background-color: rgb(18, 18, 18);
		padding: 10px 15px;
		margin: 20px;
		width: 260px;
		max-width: 260px;
		word-break: break-all;
		overflow: hidden;
		height: 300px;
		border: 2px solid white;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		border-radius: 20px;
		transition: all 0.05s;

		&:hover {
			background-color: rgb(0, 0, 0);
			cursor: pointer;
			scale: 1.2;
			transition: all 0.04s;
		}

		span {
			display: block;
			margin-top: auto;
		}
	}

	@media only screen and (max-width: 768px) {
		.note {
			width: 90%;
			padding: 2px;
			margin: 5px;
			border: 1px solid white;

			h2 {
				text-align: center;
				font-size: 20px;
			}

			p {
				font-size: 16px;
				word-wrap: break-word;
			}
			span {
				font-size: 18px;
				padding-bottom: 10px;
			}
		}
	}
</style>
