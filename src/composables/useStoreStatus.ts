import type { StoreStatus } from '@/stores/stores.types';
import type { Reactive } from 'vue';

export function useStatus<T extends StoreStatus>(status: Reactive<T>) {
	function updateStatus(newData: Record<string, any>): void {
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
	}

	return { status, updateStatus };
}
