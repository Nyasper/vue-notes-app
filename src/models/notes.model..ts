export interface Note {
	title: string;
	description: string;
	userId: string;
	created: string;
}

export interface NoteWithId extends Note {
	id: string;
}

export type NotesMapReadOnly = ReadonlyMap<string, Note>;

export type NoteInsert = Pick<Note, 'title' | 'description'>;
export type NoteUpdate = Pick<Note, 'title' | 'description'>;
