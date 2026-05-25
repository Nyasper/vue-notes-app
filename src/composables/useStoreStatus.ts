import type { StoreStatus } from '@/stores/stores.types';
import type { Reactive } from 'vue';
import { ToastStore } from '@/stores/toastStore';

export function useStatus<T extends StoreStatus>(status: Reactive<T>) {
	function updateStatus(newData: Record<string, any>, silent = false): void {
		if (!status || !newData) return;
		status.loading.startLoading();

		const keysToExclude: (keyof StoreStatus)[] = ['loading'];

		for (const key in status) {
			if (Object.prototype.hasOwnProperty.call(status, key)) {
				if (keysToExclude.includes(key as keyof StoreStatus)) continue;
				(status as any)[key] = newData[key];
			}
		}
		status.loading.stopLoading();

		// Trigger global toast alert if there is a message and it's not silent
		if (!silent && newData.message && typeof newData.message === 'string' && newData.message.trim().length > 0) {
			if (newData.success === true) {
				ToastStore.success(newData.message);
			} else {
				ToastStore.error(newData.message);
			}
		}
	}

	return { status, updateStatus };
}


