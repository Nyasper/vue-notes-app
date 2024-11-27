import { reactive, readonly, ref } from 'vue';
import { type LoginBody, type RegisterBody } from '@/services/authService';
import type { UserInfo } from '@/models/user.model';
import {
	registerUser as registerUserInDB,
	loginUser as loginUserInDb,
	logoutUser as logoutUserInDb,
	getUserInfo as getUserInfoFromDb,
} from '@/services/authService';
import type { FetchError } from '@/services/fetchError';
import { useStatus } from '../composables/useStoreStatus';
import { useLoading } from '../composables/useLoading';

function useAuthStore() {
	const user = reactive<UserInfo>({});
	const isAuth = ref(false);
	const isAdmin = ref(false);

	function updateUserInfo(newData: UserInfo | null) {
		if (!newData) return;
		Object.assign(user, newData);
	}

	// store status
	let donRetry = false;
	const { status, updateStatus } = useStatus(
		reactive({
			success: false,
			statusCode: 0,
			message: '',
			loading: useLoading(),
		})
	);

	async function getUserInfo(): Promise<void> {
		// if (status.donRetry) return;
		try {
			status.loading.startLoading(); // => when calling updateStatus() it automatic stop the loading state.
			const userInfo = await getUserInfoFromDb();
			isAuth.value = userInfo.success ?? false;
			isAdmin.value = userInfo.success && !!userInfo.data?.admin;
			if (status.statusCode === 401) {
				donRetry = true;
			}

			updateStatus(userInfo);
			updateUserInfo(userInfo.data);
		} catch (error) {
			updateStatus(error as FetchError);
		}
	}
	getUserInfo();

	async function loginUser(credentialts: LoginBody): Promise<void> {
		try {
			status.loading.startLoading();
			const response = await loginUserInDb(credentialts);

			if (response.success) {
				await getUserInfo();
			}
			updateStatus(response);
		} catch (error) {
			updateStatus(error as FetchError);
		}
	}

	async function registerUser(credentialts: RegisterBody): Promise<void> {
		try {
			status.loading.startLoading();
			const response = await registerUserInDB(credentialts);

			updateStatus(response);
		} catch (error) {
			updateStatus(error as FetchError);
		}
	}

	async function logoutUser(): Promise<void> {
		try {
			status.loading.startLoading();
			const response = await logoutUserInDb();
			document.cookie =
				'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
			isAuth.value = false;
			isAdmin.value = false;
			updateStatus(response);
		} catch (error) {
			updateStatus(error as FetchError);
		}
	}

	return {
		// states
		user: readonly(user),
		status: readonly(status),
		isAuth: readonly(isAuth),
		isAdmin: readonly(isAdmin),

		// methods
		getUserInfo,
		registerUser,
		loginUser,
		logoutUser,
	};
}

export const AuthStore = useAuthStore();
