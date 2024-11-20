import type { UserAdminDataWithId } from '@/models/adminData.model';
import { adminUsersBase, fetchClient } from './fetchClient';
import type { ResponseWithData, ResponseWithMessage } from './response.type';
import type { FetchError } from './fetchError';

export async function getUsers(): Promise<
	ResponseWithData<UserAdminDataWithId[]>
> {
	try {
		const { response, status } = await fetchClient<
			ResponseWithData<UserAdminDataWithId[]>
		>(adminUsersBase('/all'));
		return { ...response, status };
	} catch (error) {
		return error as FetchError;
	}
}

export async function getUser(
	id: string
): Promise<ResponseWithData<UserAdminDataWithId>> {
	try {
		const { response, status } = await fetchClient<
			ResponseWithData<UserAdminDataWithId>
		>(adminUsersBase(`/${id}`));
		return { ...response, status };
	} catch (error) {
		return error as FetchError;
	}
}

export async function deleteUser(id: string): Promise<ResponseWithMessage> {
	try {
		const { response, status } = await fetchClient<ResponseWithMessage>(
			adminUsersBase(`/${id}`),
			'DELETE'
		);

		return { ...response, status };
	} catch (error) {
		return error as FetchError;
	}
}
