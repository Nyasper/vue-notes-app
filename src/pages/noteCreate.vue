<template>
	<NoteEditor
		v-model:title="title"
		v-model:description="description"
		:onSubmit="saveTask"
	/>
	<ShowError :error />
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import router from '../routes';
	import { NotesStore } from '@/stores/notesStore';
	import NoteEditor from '@/components/noteEditor.vue';
	import ShowError from '@/components/showError.vue';
	import { validateNote } from '@/services/validator';
	const title = ref('');
	const description = ref('');
	const error = ref<string | null>(null);

	async function saveTask(): Promise<void> {
		const noteToInsert = {
			title: title.value,
			description: description.value,
		};
		const validation = validateNote(noteToInsert);
		if (!validation.success) {
			error.value = validation.message;
			return;
		}
		await NotesStore.createNote(noteToInsert);
		if (!NotesStore.status.success) {
			error.value = NotesStore.status.message;
			return;
		}
		router.push({ name: 'notesList' });
	}
</script>
