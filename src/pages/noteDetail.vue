<template>
	<NoteEditor
		:id
		mode="update"
		v-model:title="provTitle"
		v-model:description="provDesc"
		:onSubmit="updateNoteAction"
		:deleteAction="deleteAction"
	/>
	<ShowError :error />
</template>

<script setup lang="ts">
	import { ref, watchEffect } from 'vue';
	import { useRoute } from 'vue-router';
	import router from '../routes';
	import { NotesStore } from '@/stores/notesStore';
	import type { NoteUpdate } from '@/models/notes.model.';
	import NoteEditor from '@/components/noteEditor.vue';
	import ShowError from '@/components/showError.vue';

	const id = useRoute().params.key as string; // => get te 'key' parameter named as 'id'.
	const error = ref<string | null>(null);

	const provTitle = ref('');
	const provDesc = ref('');

	const note = NotesStore.getNoteById(id);
	watchEffect(() => {
		provTitle.value = note.value?.title ?? '';
		provDesc.value = note.value?.description ?? '';
	});

	if (note?.value === null) error.value = 'Error on getting note with Id';

	// default note
	let initialNoteValues: NoteUpdate | null = null;
	watchEffect(() => {
		if (note.value && !initialNoteValues) {
			initialNoteValues = { ...note.value }; // once
		}
	});

	async function updateNoteAction(): Promise<void> {
		if (note.value === null) return;

		const taskUpdated: NoteUpdate = {
			title: provTitle.value,
			description: provDesc.value,
		};

		await NotesStore.updateNote(id, taskUpdated);

		if (!NotesStore.status.success) {
			error.value = NotesStore.status.message;
			return;
		}
		router.push({ name: 'notesList' });
	}

	async function deleteAction(): Promise<void> {
		if (note.value === null) return;

		await NotesStore.deleteNote(id);
		if (!NotesStore.status.success) {
			error.value = NotesStore.status.message;
			return;
		}
		router.push({ name: 'notesList' });
	}
</script>
