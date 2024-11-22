<template>
	<article id="taskFormContainer">
		<form @submit.prevent="onSubmit" id="taskForm">
			<h2>{{ isUpdateMode ? 'Update' : 'Create' }} note</h2>
			<span id="titleCounter">{{ `${title.length}/60` }}</span>
			<input
				type="text"
				placeholder="Add a Title"
				class="input-title"
				v-model="title"
				required
				maxlength="60"
			/>
			<textarea
				class="input-description"
				placeholder="Add a Description"
				v-model="description"
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
	</article>
</template>

<script setup lang="ts">
	import type { NoteUpdate } from '@/models/notes.model.';

	import { computed, watchEffect } from 'vue';

	const title = defineModel<string>('title', { required: true });
	const description = defineModel<string>('description', { required: true });

	const { onSubmit, mode = 'create', id } = defineProps<Props>();

	const isUpdateMode = computed(() => mode === 'update');

	// default note
	let initialNoteValues: NoteUpdate | null = null;
	watchEffect(() => {
		if (!initialNoteValues) {
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
		title.value = initialNoteValues!.title ?? '';
		description.value = initialNoteValues!.description ?? '';
	};

	interface Props {
		onSubmit: () => Promise<void>;
		mode?: 'create' | 'update';
		id?: string;
		deleteAction?: () => Promise<void>;
	}
</script>

<style scoped>
	#taskForm {
		margin: 20px auto;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		width: max-content;
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
		width: 90%;
		max-width: 60vw;
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

	/* #input-description:focus {
		background-color: rgb(57, 57, 57);
	} */

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
