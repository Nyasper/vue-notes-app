import { fetchClient, authBase } from './fetchClient';
import type { ResponseWithData, ResponseWithMessage } from './response.type';
import type { UserInfo } from '@/models/user.model';
import { errorServerDoesntRespond } from './fetchClient';

export async function loginUser(
	credentialts: LoginBody
): Promise<ResponseWithMessage> {
	try {
		const response = await fetchClient<ResponseWithMessage, LoginBody>(
			authBase('/login'),
			'POST',
			credentialts
		);
		return response;
	} catch (error) {
		return errorServerDoesntRespond(error);
	}
}

export const registerUser = async (credentials: RegisterBody) =>
	await fetchClient<ResponseWithMessage, RegisterBody>(
		authBase('/register'),
		'POST',
		credentials
	);

export const logoutUser = async () =>
	await fetchClient<ResponseWithMessage>(authBase('/logout'), 'POST');

export const getUserInfo = async () =>
	await fetchClient<ResponseWithData<UserInfo>>(authBase('/info'));

// types

export interface LoginBody {
	username: string;
	password: string;
}

export interface RegisterBody extends LoginBody {
	password2: string;
}
