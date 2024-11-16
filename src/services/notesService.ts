import type {
	NoteWithId,
	NoteInsert,
	NoteUpdate,
} from '../models/notes.model..js';
import {
	errorServerDoesntRespond,
	fetchClient,
	notesBase,
} from './fetchClient.js';
import type { ResponseWithData, ResponseWithMessage } from './response.type.js';

export async function createNote(
	taskToInsert: NoteInsert
): Promise<ResponseWithData<NoteWithId>> {
	try {
		const data = await fetchClient<ResponseWithData<NoteWithId>, NoteInsert>(
			notesBase(''),
			'POST',
			taskToInsert
		);
		return data;
	} catch (error) {
		return errorServerDoesntRespond(error);
	}
}

export async function getNote(
	id: string
): Promise<ResponseWithData<NoteWithId>> {
	try {
		const data = await fetchClient<ResponseWithData<NoteWithId>>(
			notesBase(`/${id}`)
		);
		return data;
	} catch (error) {
		return errorServerDoesntRespond(error);
	}
}

export async function getNotes(): Promise<ResponseWithData<NoteWithId[]>> {
	try {
		const data = await fetchClient<ResponseWithData<NoteWithId[]>>(
			notesBase('/all')
		);
		return data;
	} catch (error) {
		return errorServerDoesntRespond(error);
	}
}

export async function updateNote(
	id: string,
	noteToUpdate: NoteUpdate
): Promise<ResponseWithData<NoteWithId>> {
	try {
		const data = await fetchClient<ResponseWithData<NoteWithId>, NoteUpdate>(
			notesBase(`/${id}`),
			'PUT',
			noteToUpdate
		);

		return data;
	} catch (error) {
		return errorServerDoesntRespond(error);
	}
}

export async function deleteNote(id: string): Promise<ResponseWithMessage> {
	try {
		const data = await fetchClient<ResponseWithMessage>(
			notesBase(`/${id}`),
			'DELETE'
		);

		return data;
	} catch (error) {
		return errorServerDoesntRespond(error);
	}
}
