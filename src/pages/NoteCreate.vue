<template>
	<div id="taskFormContainer">
		<form @submit.prevent="saveTask" id="taskForm">
			<h2>Add a Note</h2>
			<span id="titleCounter">{{ `${title.length}/60` }}</span>
			<input
				type="text"
				placeholder="Add a Title"
				v-model="title"
				id="input-title"
				required
				maxlength="60"
			/>
			<textarea
				id="input-description"
				placeholder="Add a Description"
				v-model="description"
				required
			></textarea>
			<button id="saveButton" :disabled="title.length === 0">Save</button>
		</form>
		<NotePreview :title :description />
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { NotesStore } from '@/stores/NotesStore';
	import NotePreview from '../components/NotePreview.vue';
	import router from '../routes';

	const title = ref('');
	const description = ref('');

	async function saveTask() {
		const taskToInsert = {
			title: title.value,
			description: description.value,
		};

		const newNote = await NotesStore.createNote(taskToInsert);
		console.info('note created:', newNote);
		router.push({ name: 'notesList' });
	}
</script>

<style scoped>
	#taskFormContainer {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		height: auto;
		width: 100%;
	}

	#taskForm {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		min-width: 30%;
		min-height: max-content;
	}

	#addNote {
		margin: 0;
		padding: 0;
		height: 100%;
		width: 40%;
		overflow: auto;
	}

	#addNote > h2 {
		font-size: 2.4em;
		margin-top: 10px;
		overflow-wrap: break-word;
		display: block;
		max-width: 90%;
	}
	#addNote > p {
		font-size: 1.5em;
		overflow-wrap: break-word;
		display: block;
		max-width: 90%;
	}

	#input-title {
		padding: 10px;
		height: 60px;
		font-size: 26px;
		width: max-content;
		/* margin-left: 10px; */
		margin-right: 15px;
	}

	#input-title:focus {
		background-color: rgb(57, 57, 57);
	}

	#input-description {
		margin-top: 10px;
		padding: 10px;
		height: 300px;
		font-size: 26px;
	}

	#input-description:focus {
		background-color: rgb(57, 57, 57);
	}

	#saveButton,
	#deleteButton,
	#cancelButton {
		padding: 10px;
		height: 60px;
		font-size: 26px;
		margin: 15px;
		border-radius: 20%;
		background-color: rgb(94, 94, 94);
	}

	#saveButton:hover,
	#deleteButton:hover,
	#cancelButton:hover {
		background-color: rgb(57, 57, 57);
	}

	#saveButton:disabled,
	#deleteButton:disabled,
	#cancelButton:disabled {
		background-color: rgba(0, 0, 0, 0.456);
		border: none;
		color: rgb(64, 64, 64);
	}

	#taskFormContainer > form > h2 {
		font-size: 30px;
		padding: 10px;
		margin: 10px;
	}

	#titleCounter {
		font-size: 1.2em;
		font-weight: bold;
	}

	@media only screen and (max-width: 768px) {
		#taskForm {
			width: 100%;
			align-items: center;
			justify-content: center;

			#input-title {
				height: 30px;
				margin: 0;
				width: 80%;
			}
			#input-description {
				margin: 10px 0;
				width: 80%;
				height: 400px;
			}
		}
	}
</style>
