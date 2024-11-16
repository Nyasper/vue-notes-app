<template>
	<section class="taskDetailContainer" v-if="note">
		<NotePreview :title="note.title" :description="note.description" />

		<div v-if="note !== null" class="inputsContainer">
			<section class="labelContainer">
				<label for="title">Title {{ note.title.length }}/60</label>
				<input
					type="text"
					name="title"
					id="title"
					v-model="note.title"
					required
					minlength="2"
					maxlength="60"
				/>
			</section>

			<section class="labelContainer">
				<label for="description">Description</label>
				<textarea
					name="description"
					id="description"
					v-model="note.description"
					cols="30"
					rows="10"
					maxlength="300"
					required
				></textarea>
			</section>

			<section id="buttonsContainer">
				<button @click.prevent="updateNoteFunc" :disabled="noteHasChanged">
					Update Note
				</button>
				<button @click.prevent="deleteNote()">Delete Note</button>
			</section>
		</div>
	</section>

	<section v-else="error">
		<h3>
			Something went wrong: <span class="errorMessage">{{ error }}</span>
		</h3>
	</section>
</template>

<script setup lang="ts">
	import { computed, ref, watchEffect } from 'vue';
	import { useRoute } from 'vue-router';
	import router from '../routes';
	import { NotesStore } from '@/stores/notesStore';
	import NotePreview from '@/components/notePreview.vue';
	import type { NoteUpdate } from '@/models/notes.model.';

	const id = useRoute().params.key as string; // => get te 'key' parameter named as 'id'.
	const error = ref<string | null>(null);

	const note = NotesStore.getNoteById(id);
	if (note.value === null) error.value = 'Error on getting note with Id';

	// default note
	let initialNoteValues: NoteUpdate | null = null;
	watchEffect(() => {
		if (note.value && !initialNoteValues) {
			initialNoteValues = { ...note.value }; // once
		}
	});

	const noteHasChanged = computed(() => {
		if (initialNoteValues === null || note.value === null) return false;
		return (
			note.value.title === initialNoteValues.title &&
			note.value.description === initialNoteValues.description
		);
	});

	async function updateNoteFunc() {
		try {
			if (note.value === null) return;

			const taskUpdated: NoteUpdate = {
				title: note.value.title,
				description: note.value.description,
			};

			const noteUpdated = await NotesStore.updateNote(id, taskUpdated);
			console.log('note updated:', noteUpdated);
			router.push({ name: 'notesList' });
		} catch (error) {
			console.error('Error on updating task', error);
			location.reload();
		}
	}

	async function deleteNote() {
		if (note.value === null) return;

		await NotesStore.deleteNote(id);
		router.push({ name: 'notesList' });
	}
</script>

<style scoped>
	.taskDetailContainer {
		width: 100%;
		display: flex;
		justify-content: space-around;
		font-size: 1.2em;
	}

	.inputsContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 40%;
	}

	.labelContainer {
		margin: 20px 0;
		width: 100%;
	}
	.labelContainer > label {
		display: block;
		text-align: center;
		font-size: 1.2em;
		padding: 5px;
	}
	.labelContainer > input,
	.labelContainer > textarea {
		display: block;
		width: 70%;
		height: 35px;
		padding: 5px 10px;
		font-size: 1.4em;
		margin: 0 auto;
	}
	#title {
		padding: 10px;
	}

	#description {
		min-height: 250px;
		padding: 15px;
	}

	#buttonsContainer {
		display: block;
		margin: 0 auto;
	}

	#buttonsContainer > button {
		margin: 0 5px;
	}

	h3 {
		font-size: 20px;
	}

	@media only screen and (max-width: 768px) {
		.inputsContainer {
			margin: 0;
			padding: 0;
			width: 100%;
			height: 100vh;
			justify-content: flex-start;
		}
	}
</style>
