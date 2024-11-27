<template>
	<form @submit.prevent="onSubmit" id="taskForm">
		<h2>{{ isUpdateMode ? 'Update' : 'Create' }} note</h2>
		<span id="titleCounter">{{
			`${title.length}/${NoteDTOConsts.title.max}`
		}}</span>
		<input
			type="text"
			placeholder="Add a Title"
			class="input-title"
			v-model="title"
			required
			:minlength="NoteDTOConsts.title.min"
			:maxlength="NoteDTOConsts.title.max"
		/>
		<textarea
			class="input-description"
			placeholder="Add a Description"
			v-model="description"
			:maxlength="NoteDTOConsts.description.max"
			required
		/>
		<section>
			<button
				id="saveButton"
				type="submit"
				:disabled="title.length === 0 || noteHasChanged"
			>
				{{ isUpdateMode ? 'update' : 'save' }}
			</button>
			<button
				id="resetButton"
				type="button"
				:disabled="title.length === 0 || noteHasChanged"
				@click.prevent="resetButtonAction"
			>
				reset
			</button>
			<button
				v-if="isUpdateMode"
				id="deleteButton"
				type="button"
				@click.prevent="deleteAction"
			>
				Delete
			</button>
		</section>
	</form>
</template>

<script setup lang="ts">
	import type { NoteUpdate } from '@/models/notes.model.';
	import { NoteDTOConsts } from '@/services/validator';
	import { NotesStore } from '@/stores/notesStore';
	import { computed, watchEffect } from 'vue';

	const title = defineModel<string>('title', { required: true });
	const description = defineModel<string>('description', { required: true });

	const { onSubmit, mode = 'create' } = defineProps<Props>();

	const isUpdateMode = computed(() => mode === 'update');

	// default note
	let initialNoteValues: NoteUpdate | null = null;
	watchEffect(() => {
		if (initialNoteValues === null) {
			console.log('cambio');
			initialNoteValues = {
				title: title.value,
				description: description.value,
			}; // once
		}
	});

	const noteHasChanged = computed(() => {
		if (
			initialNoteValues === null ||
			title.value === '' ||
			description.value === ''
		)
			return false;
		return (
			title.value === initialNoteValues.title &&
			description.value === initialNoteValues.description
		);
	});

	const resetButtonAction = () => {
		console.log({
			initialTitle: initialNoteValues?.title,
			initialDesc: initialNoteValues?.description,
		});
		title.value = initialNoteValues!.title ?? '';
		description.value = initialNoteValues!.description ?? '';
	};

	interface Props {
		onSubmit: () => Promise<void>;
		deleteAction?: () => Promise<void>;
		mode?: 'create' | 'update';
		id?: string;
	}
</script>

<style scoped>
	#taskForm {
		margin: 20px auto;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: 40%;
		min-width: 30%;
		min-height: max-content;
		background-color: rgb(18, 18, 18);
		padding: 10px 15px;
		border-radius: 20px;
		border: 1px solid white;
	}

	.input-title {
		padding: 10px;
		height: 30px;
		font-size: 22px;
		width: 90%;
		background-color: transparent;
		border: none;
	}

	.input-description {
		margin-top: 10px;
		padding: 10px;
		height: 300px;
		font-size: 20px;
		max-width: 60vw;
		width: 90%;
		max-width: 90%;
		min-width: 100px;
		overflow: auto;
		background-color: transparent;
		border: none;
	}

	input:focus,
	textarea:focus {
		background-color: rgb(32, 32, 32);
	}

	input::placeholder,
	textarea::placeholder {
		font-size: 20px;
		color: rgb(114, 114, 114);
	}

	#saveButton,
	#deleteButton,
	#resetButton {
		padding: 10px;
		height: 60px;
		font-size: 26px;
		margin: 15px;
		border-radius: 20%;
		background-color: rgb(94, 94, 94);
	}

	#saveButton:hover,
	#deleteButton:hover,
	#resetButton:hover {
		background-color: rgb(57, 57, 57);
	}

	#saveButton:disabled,
	#deleteButton:disabled,
	#resetButton:disabled {
		background-color: rgba(0, 0, 0, 0.456);
		border: none;
		color: rgb(64, 64, 64);
	}

	#titleCounter {
		font-size: 1.2em;
		font-weight: bold;
	}

	@media only screen and (max-width: 768px) {
		#taskForm {
			width: 90%;
			align-items: center;
			justify-content: center;

			.input-title {
				width: 96%;
				height: 30px;
				margin: 0;
			}
			.input-description {
				margin: 10px 0;
				width: 96%;
				max-width: 100%;
				height: 400px;
			}

			button {
				font-size: 18px;
				padding: 0 10px;
				margin: 0 10px;
				height: 60px;
				width: max-content;
			}
		}
	}
</style>
