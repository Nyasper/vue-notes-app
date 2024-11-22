import type {
	NoteWithId,
	NoteInsert,
	NoteUpdate,
} from '../models/notes.model..js';
import { fetchClient, notesBase } from './fetchClient.js';
import type { ResponseWithData, ResponseWithMessage } from './response.type.js';
import type { FetchError } from './fetchError.js';

export async function createNote(
	taskToInsert: NoteInsert
): Promise<ResponseWithData<NoteWithId | null>> {
	try {
		const { response, statusCode } = await fetchClient<
			ResponseWithData<NoteWithId>,
			NoteInsert
		>(notesBase(''), 'POST', taskToInsert);
		return { ...response, statusCode };
	} catch (e) {
		const response = e as FetchError;
		return { ...response, data: null };
	}
}

export async function getNote(
	id: string
): Promise<ResponseWithData<NoteWithId | null>> {
	try {
		const { response, statusCode } = await fetchClient<
			ResponseWithData<NoteWithId>
		>(notesBase(`/${id}`));
		return { ...response, statusCode };
	} catch (e) {
		const response = e as FetchError;
		return { ...response, data: null };
	}
}

export async function getNotes(): Promise<ResponseWithData<NoteWithId[]>> {
	try {
		const { response, statusCode } = await fetchClient<
			ResponseWithData<NoteWithId[]>
		>(notesBase('/all'));
		return { ...response, statusCode };
	} catch (e) {
		const response = e as FetchError;
		return { ...response, data: [] };
	}
}

export async function updateNote(
	id: string,
	noteToUpdate: NoteUpdate
): Promise<ResponseWithData<NoteWithId | null>> {
	try {
		const { response, statusCode } = await fetchClient<
			ResponseWithData<NoteWithId>,
			NoteUpdate
		>(notesBase(`/${id}`), 'PUT', noteToUpdate);

		return { ...response, statusCode };
	} catch (e) {
		const response = e as FetchError;
		return { ...response, data: null };
	}
}

export async function deleteNote(id: string): Promise<ResponseWithMessage> {
	try {
		const { response, statusCode } = await fetchClient<ResponseWithMessage>(
			notesBase(`/${id}`),
			'DELETE'
		);

		return { ...response, statusCode };
	} catch (e) {
		return e as FetchError;
	}
}
