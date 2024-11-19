import { onMounted, onBeforeUnmount } from 'vue';

/**
 * Composable para registrar eventos personalizados en el documento.
 *
 * @param {string} event - El nombre del evento (por ejemplo, 'click', 'keydown').
 * @param {Function} handler - La función manejadora para el evento.
 */

export function useDocumentEvent<T extends keyof DocumentEventMap>(
	event: T,
	handler: (this: Document, event: DocumentEventMap[T]) => void
): void {
	onMounted(() => {
		document.addEventListener(event, handler);
	});

	onBeforeUnmount(() => {
		document.removeEventListener(event, handler);
	});
}
