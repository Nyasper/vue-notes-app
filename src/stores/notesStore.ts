import { computed, reactive, readonly, ref, type ComputedRef } from 'vue';
import { useLoadingStore } from './loadingStore';
import type {
	Note,
	NoteInsert,
	NoteUpdate,
	NoteWithId,
} from '../models/notes.model.';
import {
	getNotes as getNotesFromDb,
	createNote as createNoteInDB,
	deleteNote as deleteNoteInDB,
	updateNote as updateNoteInDB,
} from '../services/notesService';

function useNotesStore() {
	const notes = reactive(new Map<string, Note>());
	const error = ref<string | null>(null);
	let fetchedOnce = false;
	const LoadingState = useLoadingStore();

	async function getData() {
		if (fetchedOnce) return;
		LoadingState.startLoading();
		try {
			const response = await getNotesFromDb();
			if (!response.success) return;
			response.data!.forEach(({ id, ...Note }) => notes.set(id, Note));
		} catch (e) {
			if (e instanceof Error) {
				error.value = e.message;
				console.error(e.message);
			} else {
				error.value = e as string;
				console.error(e);
			}
		} finally {
			fetchedOnce = true;
			LoadingState.stopLoading();
		}
	}
	getData();

	async function createNote(noteToInsert: NoteInsert): Promise<Note | null> {
		const { success, data } = await createNoteInDB(noteToInsert);
		if (!success) return null;

		const { id, ...newNote } = data as NoteWithId;
		notes.set(id, newNote);

		return newNote;
	}

	async function updateNote(
		paramId: string,
		newsValues: NoteUpdate
	): Promise<Note | null> {
		if (!notes.has(paramId)) return null;

		const { success, data } = await updateNoteInDB(paramId, newsValues);
		if (!success) return null;

		const { id, ...updatedNote } = data as NoteWithId;
		const noteToUpdate = notes.get(paramId);
		if (!noteToUpdate) return null;

		noteToUpdate.title = newsValues.title;
		noteToUpdate.description = newsValues.description;
		notes.set(id, updatedNote);

		return updatedNote;
	}

	async function deleteNote(id: string): Promise<void> {
		await deleteNoteInDB(id);
		notes.delete(id);
	}

	function getNoteById(id: string): ComputedRef<Note | null> {
		return computed(() => notes.get(id) ?? null);
	}

	return {
		notes: readonly(notes),
		createNote,
		getNoteById,
		error,
		updateNote,
		deleteNote,
		loading: LoadingState.loading,
	};
}

export const NotesStore = useNotesStore();
