import { reactive, readonly } from 'vue';

export interface Toast {
	id: string;
	message: string;
	type: 'success' | 'error' | 'info';
}

function useToastStore() {
	const toasts = reactive<Toast[]>([]);

	function addToast(message: string, type: 'success' | 'error' | 'info' = 'info', duration = 4000) {
		const id = Math.random().toString(36).substring(2, 9);
		const newToast: Toast = { id, message, type };
		toasts.push(newToast);

		setTimeout(() => {
			removeToast(id);
		}, duration);
	}

	function removeToast(id: string) {
		const index = toasts.findIndex((t) => t.id === id);
		if (index !== -1) {
			toasts.splice(index, 1);
		}
	}

	const success = (msg: string, dur?: number) => addToast(msg, 'success', dur);
	const error = (msg: string, dur?: number) => addToast(msg, 'error', dur);
	const info = (msg: string, dur?: number) => addToast(msg, 'info', dur);

	return {
		toasts: readonly(toasts),
		addToast,
		removeToast,
		success,
		error,
		info,
	};
}

export const ToastStore = useToastStore();
