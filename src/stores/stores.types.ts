import type { FetchError } from '@/services/fetchError';
import type { useLoading } from '../composables/useLoading';

export interface StoreStatus extends Omit<FetchError, 'name' | 'stack'> {
	loading: ReturnType<typeof useLoading>;
}

export interface NoteStoreStatus extends StoreStatus {
	fetchedOnce: boolean;
}
