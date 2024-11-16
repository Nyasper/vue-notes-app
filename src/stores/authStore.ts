import { computed, reactive, readonly } from 'vue';
import {
	getUserInfo as getUserInfoFromDb,
	type LoginBody,
	type RegisterBody,
} from '@/services/authService';
import type { UserInfo } from '@/models/user.model';
import {
	registerUser as registerUserInDB,
	loginUser as loginUserinDb,
	logoutUser as logoutUserInDb,
} from '@/services/authService';
import type { ResponseWithMessage } from '@/services/response.type';

function useAuthStore() {
	const user = reactive<UserInfo>({});

	async function getUserInfo(): Promise<void> {
		const userInfo = await getUserInfoFromDb();
		if (!userInfo.success) return;
		Object.assign(user, userInfo.data);
	}
	getUserInfo();

	const isAuth = computed(() => !!user.id && !!user.username); // !! => convert the values to boolean
	const isAdmin = computed(() => isAuth.value && user?.admin === true);

	async function loginUser(
		credentialts: LoginBody
	): Promise<ResponseWithMessage> {
		const res = await loginUserinDb(credentialts);
		await getUserInfo();
		return res;
	}

	async function registerUser(
		credentialts: RegisterBody
	): Promise<ResponseWithMessage> {
		const res = await registerUserInDB(credentialts);
		return res;
	}

	async function logoutUser(): Promise<ResponseWithMessage> {
		const res = await logoutUserInDb();
		await getUserInfo();
		return res;
	}

	return {
		user: readonly(user),
		isAuth,
		isAdmin,
		registerUser,
		loginUser,
		logoutUser,
	};
}

export const AuthStore = useAuthStore();
