import { onMounted, onUnmounted } from 'vue';

export function useTimeout(callback: () => void, ms: number = 1000) {
	let timeoutId: ReturnType<typeof setTimeout>;

	onMounted(() => {
		timeoutId = setTimeout(() => {
			callback();
		}, ms);
	});
	onUnmounted(() => clearTimeout(timeoutId));
}
