import type {
	UserAdminData,
	UserAdminMapReadonly,
} from '@/models/adminData.model';
import { computed, reactive, readonly, ref, type ComputedRef } from 'vue';
import { getUsers as getUsersFromDb } from '@/services/adminService';
import { useLoading } from '../composables/useLoading';
import { deleteUser as deleteUserFromDb } from '@/services/adminService';
import { useStatus } from '@/composables/useStoreStatus';
import type { FetchError } from '@/services/fetchError';

function useAdminStore() {
	const adminData = reactive(new Map<string, UserAdminData>());
	let fetchedOnce = false;
	const { status, updateStatus } = useStatus(
		reactive({
			success: false,
			statusCode: 0,
			message: '',
			loading: useLoading(),
		})
	);

	async function getAdminData(force = false): Promise<void> {
		if (fetchedOnce && !force) return;
		status.loading.startLoading();

		try {
			const response = await getUsersFromDb();
			if (!response.success) {
				updateStatus(response);
				return;
			}
			adminData.clear();
			response.data!.forEach(({ id, ...data }) => adminData.set(id, data));

			updateStatus(response, true);
		} catch (e) {
			updateStatus(e as FetchError);
		} finally {
			status.loading.stopLoading();
		}
	}


	async function deleteUser(id: string) {
		status.loading.startLoading();
		try {
			const response = await deleteUserFromDb(id);
			if (!response.success) {
				updateStatus(response);
				return;
			}
			await getAdminData(true);
			updateStatus(response);
		} catch (e) {
			updateStatus(e as FetchError);
		} finally {
			status.loading.stopLoading();
		}
	}

	function clear(): void {
		adminData.clear();
		fetchedOnce = false;
		updateStatus({
			success: false,
			statusCode: 0,
			message: '',
		});
	}

	function getUserInfo(id: string): ComputedRef<UserAdminData | null> {
		return computed(() => adminData.get(id) ?? null);
	}

	return {
		// states
		adminData: readonly(adminData) as UserAdminMapReadonly,
		status: readonly(status),

		// methods
		getUserInfo,
		deleteUser,
		getAdminData,
		clear,
	};
}

export const AdminStore = useAdminStore();

