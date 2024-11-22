import type { UserAdminDataWithId } from '@/models/adminData.model';
import { adminUsersBase, fetchClient } from './fetchClient';
import type { ResponseWithData, ResponseWithMessage } from './response.type';
import type { FetchError } from './fetchError';

export async function getUsers(): Promise<
	ResponseWithData<UserAdminDataWithId[]>
> {
	try {
		const { response, statusCode } = await fetchClient<
			ResponseWithData<UserAdminDataWithId[]>
		>(adminUsersBase('/all'));
		return { ...response, statusCode };
	} catch (e) {
		const response = e as FetchError;
		return { ...response, data: [] };
	}
}

export async function getUser(
	id: string
): Promise<ResponseWithData<UserAdminDataWithId | null>> {
	try {
		const { response, statusCode } = await fetchClient<
			ResponseWithData<UserAdminDataWithId>
		>(adminUsersBase(`/${id}`));
		return { ...response, statusCode };
	} catch (e) {
		const response = e as FetchError;
		return { ...response, data: null };
	}
}

export async function deleteUser(id: string): Promise<ResponseWithMessage> {
	try {
		const { response, statusCode } = await fetchClient<ResponseWithMessage>(
			adminUsersBase(`/${id}`),
			'DELETE'
		);

		return { ...response, statusCode };
	} catch (e) {
		return e as FetchError;
	}
}
