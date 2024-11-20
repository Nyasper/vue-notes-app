import { computed, reactive, readonly, ref } from 'vue';
import { type LoginBody, type RegisterBody } from '@/services/authService';
import type { UserInfo } from '@/models/user.model';
import {
	registerUser as registerUserInDB,
	loginUser as loginUserinDb,
	logoutUser as logoutUserInDb,
	getUserInfo as getUserInfoFromDb,
} from '@/services/authService';
import type {
	ResponseWithData,
	ResponseWithMessage,
} from '@/services/response.type';

function useAuthStore() {
	const user = reactive<UserInfo>({});
	const isAuth = ref(false);

	async function getUserInfo(): Promise<
		ResponseWithData<UserInfo | undefined>
	> {
		const userInfo = await getUserInfoFromDb();
		if (!userInfo.success) {
			isAuth.value = false;
		}
		Object.assign(user, userInfo.data);
		isAuth.value = true;
		return userInfo;
	}
	getUserInfo();

	// const isAuth = computed(() => {
	// 	const isAuth = !!user.id && !!user.username;
	// 	console.log(isAuth);
	// 	return isAuth;
	// }); // !! => convert the values to boolean
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
		document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
		await getUserInfo();
		return res;
	}

	return {
		user: readonly(user),
		isAuth: readonly(isAuth),
		isAdmin,
		getUserInfo,
		registerUser,
		loginUser,
		logoutUser,
	};
}

export const AuthStore = useAuthStore();
