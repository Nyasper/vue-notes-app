import { defineStore } from 'pinia';
import { ref } from 'vue';

//Global Middelware

export const useAuthStore = defineStore('auth', () => {
	const userState = ref(null);

	function setUserState(paramValue: any) {
		userState.value = paramValue;
	}

	return {
		userState,
		setUserState,
	};
});
