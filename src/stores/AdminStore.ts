import type {
	UserAdminData,
	UserAdminMapReadonly,
} from '@/models/adminData.model';
import { computed, reactive, readonly, ref, type ComputedRef } from 'vue';
import { getUsers as getUsersFromDb } from '@/services/adminService';
import { useLoadingStore } from './LoadingStore';
import { deleteUser as deleteUserFromDb } from '@/services/adminService';

function useAdminStore() {
	const adminData = reactive(new Map<string, UserAdminData>());
	const error = ref<string | null>(null);
	let fetchedOnce = false;
	const LoadingState = useLoadingStore();

	async function getAdminData(): Promise<void> {
		if (fetchedOnce) return;
		LoadingState.startLoading();

		try {
			const response = await getUsersFromDb();
			if (!response.success) return;
			response.data!.forEach(({ id, ...data }) => adminData.set(id, data));
		} catch (e) {
			if (e instanceof Error) {
				error.value = e.message;
				console.error(e.message);
			} else {
				error.value = e as string;
				console.error(e);
			}
		} finally {
			LoadingState.stopLoading();
		}
	}
	getAdminData();

	function getUserInfo(id: string): ComputedRef<UserAdminData | null> {
		return computed(() => adminData.get(id) ?? null);
	}

	async function deleteUser(id: string) {
		await deleteUserFromDb(id);
		await getAdminData();
	}

	return {
		adminData: readonly(adminData) as UserAdminMapReadonly,
		getUserInfo,
		deleteUser,
		error,
		loading: LoadingState.loading,
	};
}

export const AdminStore = useAdminStore();
