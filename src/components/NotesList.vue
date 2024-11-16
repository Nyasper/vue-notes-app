<template>
	<section>
		<ul class="noteContainer">
			<NoteItem
				v-for="[key, note] in notes"
				:note
				:key
				@click.prevent="router.push({ name: 'noteDetail', params: { key } })"
			/>
		</ul>
	</section>
</template>

<script setup lang="ts">
	import NoteItem from './noteItem.vue';
	import router from '@/routes';
	import type { NotesMapReadOnly } from '@/models/notes.model.';

	const { notes } = defineProps<Props>();

	interface Props {
		notes: NotesMapReadOnly;
	}
</script>

<style scoped>
	.createMessage {
		font-size: 2.5em;
		color: rgb(163, 48, 48);
	}

	.noData {
		text-align: center;
		margin-top: 100px;
		font-size: 4.5em;
	}
	.noteContainer {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}

	@media only screen and (max-width: 768px) {
		.noteContainer {
			display: grid;
			grid-template-columns: auto auto;
			margin: 0;
			gap: 10px;
			padding: 5px;
			place-items: center;
		}
	}
</style>
