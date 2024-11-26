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
	const title = ref('');
	const description = ref('');
	const error = ref<string | null>(null);

	async function saveTask(): Promise<void> {
		const taskToInsert = {
			title: title.value,
			description: description.value,
		};

		await NotesStore.createNote(taskToInsert);
		if (!NotesStore.status.success) {
			error.value = NotesStore.status.message;
			return;
		}
		router.push({ name: 'notesList' });
	}
</script>
