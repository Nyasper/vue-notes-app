import { readonly, ref } from 'vue';

export function useLoadingStore() {
	const loading = ref(false);
	const startLoading = () => (loading.value = true);
	const stopLoading = () => (loading.value = false);

	return {
		loading: readonly(loading),
		startLoading,
		stopLoading,
	};
}

// export const LoadingRouteStore = useLoadingStore(); //global state
