import { readonly, ref } from 'vue';

export function useLoading() {
	const loading = ref(false);
	const startLoading = (): void => {
		loading.value = true;
	};
	const stopLoading = (): void => {
		loading.value = false;
	};

	return {
		// states
		loading: readonly(loading),

		// methods
		startLoading,
		stopLoading,
	};
}
