import type { NoteWithId } from './notes.model.';
import type { User } from './user.model';

export interface UserAdminDataWithId extends User {
	notes: NoteWithId[];
	created: string;
}

export type UserAdminData = Omit<UserAdminDataWithId, 'id'>;

export type UserAdminMapReadonly = ReadonlyMap<string, UserAdminData>;
