import { fetchClient, authBase } from './fetchClient';
import type { ResponseWithData, ResponseWithMessage } from './response.type';
import type { UserInfo } from '@/models/user.model';
import type { FetchError } from './fetchError';

export async function loginUser(
	credentialts: LoginBody
): Promise<ResponseWithMessage> {
	try {
		const { response, status } = await fetchClient<
			ResponseWithMessage,
			LoginBody
		>(authBase('/login'), 'POST', credentialts);
		return { ...response, status };
	} catch (error) {
		return error as FetchError;
	}
}

export async function registerUser(
	credentials: RegisterBody
): Promise<ResponseWithMessage> {
	try {
		const { response, status } = await fetchClient<
			ResponseWithMessage,
			RegisterBody
		>(authBase('/register'), 'POST', credentials);

		return { ...response, status };
	} catch (error) {
		return error as FetchError;
	}
}

export async function logoutUser(): Promise<ResponseWithMessage> {
	try {
		const { response, status } = await fetchClient<ResponseWithMessage>(
			authBase('/logout'),
			'POST'
		);

		return { ...response, status };
	} catch (error) {
		return error as FetchError;
	}
}

export async function getUserInfo(): Promise<ResponseWithData<UserInfo>> {
	try {
		const { response, status } = await fetchClient<ResponseWithData<UserInfo>>(
			authBase('/info')
		);

		return { ...response, status };
	} catch (error) {
		return error as FetchError;
	}
}

// types

export interface LoginBody {
	username: string;
	password: string;
}

export interface RegisterBody extends LoginBody {
	password2: string;
}
