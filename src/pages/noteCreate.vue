<template>
	<NoteEditor
		v-model:title="title"
		v-model:description="description"
		:onSubmit="saveTask"
	/>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import router from '../routes';
	import { NotesStore } from '@/stores/notesStore';
	import NoteEditor from '@/components/noteEditor.vue';

	const title = ref('');
	const description = ref('');

	async function saveTask() {
		const taskToInsert = {
			title: title.value,
			description: description.value,
		};

		await NotesStore.createNote(taskToInsert);
		router.push({ name: 'notesList' });
	}
</script>
