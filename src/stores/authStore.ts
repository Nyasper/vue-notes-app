import { computed, reactive, readonly, ref } from 'vue';
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
	const isAuth = ref(false);

	async function getUserInfo(): Promise<void> {
		const userInfo = await getUserInfoFromDb();
		if (!userInfo.success) {
			isAuth.value = false;
			return;
		}
		isAuth.value = true;
		Object.assign(user, userInfo.data);
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
