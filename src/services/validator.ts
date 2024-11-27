import type { NoteInsert } from '@/models/notes.model.';
import type { LoginBody, RegisterBody } from './authService';
import type { ResponseWithMessage } from './response.type';

type ResponseWithMessageNoStatusCode = Omit<ResponseWithMessage, 'statusCode'>;

export function validateLogin(
	credentialts: LoginBody
): ResponseWithMessageNoStatusCode {
	const userDTOConsts = {
		username: {
			min: 3,
			max: 16,
		},
		password: {
			min: 5,
			max: 26,
		},
	};
	const { username, password } = credentialts;
	if (
		username.length < userDTOConsts.username.min ||
		username.length > userDTOConsts.username.max
	) {
		return {
			success: false,
			message: `Username must have between ${userDTOConsts.username.min} and ${userDTOConsts.username.max} characters`,
		};
	}
	if (
		password.length < userDTOConsts.password.min ||
		password.length > userDTOConsts.password.max
	) {
		return {
			success: false,
			message: `Password must have between ${userDTOConsts.password.min} and ${userDTOConsts.password.max} characters`,
		};
	}

	return {
		success: true,
		message: 'User logged successfully',
	};
}

export function validateRegister(
	credentialts: RegisterBody
): ResponseWithMessageNoStatusCode {
	if (credentialts.password !== credentialts.password2) {
		return {
			success: false,
			message: "passwords doesn't match, please verify.",
		};
	}

	const loginResponse = validateLogin(credentialts);
	if (loginResponse.success)
		return {
			success: true,
			message: 'User registered successfully',
		};

	return loginResponse;
}

export const NoteDTOConsts = {
	title: {
		min: 2,
		max: 70,
	},
	description: {
		max: 1000,
		default: '',
	},
};
export function validateNote(
	note: NoteInsert
): ResponseWithMessageNoStatusCode {
	if (
		note.title.length < NoteDTOConsts.title.min ||
		note.title.length > NoteDTOConsts.title.max
	) {
		return {
			success: false,
			message: `Note title must have between ${NoteDTOConsts.title.min} and ${NoteDTOConsts.title.max} characters`,
		};
	}
	if (note.description.length > NoteDTOConsts.description.max) {
		return {
			success: false,
			message: `Note description must have less than ${NoteDTOConsts.description.max} characters`,
		};
	}

	return {
		success: true,
		message: 'User logged successfully',
	};
}
