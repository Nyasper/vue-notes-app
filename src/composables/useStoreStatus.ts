import type { StoreStatus } from '@/stores/stores.types';

export function useStatus<T extends StoreStatus>(status: T) {
	function updateStatus(newData: Partial<Record<keyof T, any>>): void {
		if (!status || !newData) return;
		status.loading.startLoading();

		console.log('status', status);
		const keysToExclude: (keyof StoreStatus)[] = ['loading'];

		for (const key in status) {
			if (Object.prototype.hasOwnProperty.call(status, key)) {
				if (keysToExclude.includes(key as keyof StoreStatus)) continue;
				status[key] = newData[key];
			}
		}
		status.loading.stopLoading();
		console.log('new data', newData);
	}

	return { status, updateStatus };
}
