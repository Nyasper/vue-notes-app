import { computed, reactive, readonly, ref, type ComputedRef } from 'vue';
import { useLoading } from '../composables/useLoading';
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
import { useStatus } from '../composables/useStoreStatus';
import type { FetchError } from '@/services/fetchError';
import type { NoteStoreStatus } from './stores.types';

function useNotesStore() {
	const notes = reactive(new Map<string, Note>());

	let fetchedOnce = false;
	const { status, updateStatus } = useStatus(
		reactive({
			success: false,
			statusCode: 0,
			message: '',
			loading: useLoading(),
		})
	);

	async function getData() {
		if (fetchedOnce) return;
		status.loading.startLoading();

		try {
			const response = await getNotesFromDb();
			if (!response.success) return;
			response.data!.forEach(({ id, ...Note }) => notes.set(id, Note));
			fetchedOnce = true;
			updateStatus(response);
		} catch (error) {
			updateStatus(error as FetchError);
		} finally {
			status.loading.stopLoading();
		}
	}
	getData();

	async function createNote(noteToInsert: NoteInsert): Promise<void> {
		status.loading.startLoading();
		try {
			const { data, ...response } = await createNoteInDB(noteToInsert);

			const { id, ...newNote } = data as NoteWithId;
			notes.set(id, newNote);

			updateStatus(response);
		} catch (error) {
			updateStatus(error as FetchError);
		}
	}

	async function updateNote(
		paramId: string,
		newsValues: NoteUpdate
	): Promise<void> {
		status.loading.startLoading();
		try {
			if (!notes.has(paramId)) return;

			const { data, ...response } = await updateNoteInDB(paramId, newsValues);
			if (!response.success) return;

			const { id, ...updatedNote } = data as NoteWithId;
			const noteToUpdate = notes.get(paramId);
			if (!noteToUpdate) return;

			noteToUpdate.title = newsValues.title;
			noteToUpdate.description = newsValues.description;
			notes.set(id, updatedNote);

			updateStatus(response);
		} catch (error) {
			updateStatus(error as FetchError);
		}
	}

	async function deleteNote(id: string): Promise<void> {
		status.loading.startLoading();
		try {
			const response = await deleteNoteInDB(id);
			updateStatus(response);
			notes.delete(id);
		} catch (error) {
			updateStatus(error as FetchError);
		}
	}

	function getNoteById(id: string): ComputedRef<Note | null> {
		return computed(() => notes.get(id) ?? null);
	}

	return {
		// states
		notes: readonly(notes),
		status: readonly(status),

		// methods
		createNote,
		getNoteById,
		updateNote,
		deleteNote,
	};
}

export const NotesStore = useNotesStore();
