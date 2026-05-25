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
		background-color: rgb(22, 22, 22);
		padding: 18px 22px;
		margin: 20px;
		width: 260px;
		max-width: 260px;
		word-break: break-all;
		overflow: hidden;
		height: 300px;
		border: 2px solid rgba(255, 255, 255, 0.15);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		border-radius: 16px;
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			border-color 0.3s ease,
			background-color 0.3s ease,
			box-shadow 0.3s ease;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

		&:hover {
			background-color: rgb(28, 28, 28);
			border-color: rgba(255, 255, 255, 0.7);
			cursor: pointer;
			transform: translateY(-6px) scale(1.02);
			box-shadow: 0 12px 30px rgba(0, 0, 0, 0.45);
		}

		h2 {
			font-size: 1.4em;
			margin: 0 0 10px 0;
			text-align: center;
			color: #f3f4f6;
		}

		p {
			font-size: 1em;
			color: #9ca3af;
			line-height: 1.4;
			text-align: center;
			display: -webkit-box;
			-webkit-line-clamp: 7;
			-webkit-box-orient: vertical;
			overflow: hidden;
			text-overflow: ellipsis;
			word-break: break-word;
		}

		span {
			display: block;
			margin-top: auto;
			font-size: 0.85em;
			color: #6b7280;
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
