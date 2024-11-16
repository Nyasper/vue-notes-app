import type { UserAdminDataWithId } from '@/models/adminData.model';
import {
	adminUsersBase,
	errorServerDoesntRespond,
	fetchClient,
} from './fetchClient';
import type { ResponseWithData, ResponseWithMessage } from './response.type';

export async function getUsers(): Promise<
	ResponseWithData<UserAdminDataWithId[]>
> {
	try {
		const data = await fetchClient<ResponseWithData<UserAdminDataWithId[]>>(
			adminUsersBase('/all')
		);
		return data;
	} catch (error) {
		return errorServerDoesntRespond(error);
	}
}

export async function getUser(
	id: string
): Promise<ResponseWithData<UserAdminDataWithId>> {
	try {
		const data = await fetchClient<ResponseWithData<UserAdminDataWithId>>(
			adminUsersBase(`/${id}`)
		);
		return data;
	} catch (error) {
		return errorServerDoesntRespond(error);
	}
}

export async function deleteUser(id: string): Promise<ResponseWithMessage> {
	try {
		const data = await fetchClient<ResponseWithMessage>(
			adminUsersBase(`/${id}`),
			'DELETE'
		);

		return data;
	} catch (error) {
		return errorServerDoesntRespond(error);
	}
}
