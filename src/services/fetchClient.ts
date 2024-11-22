import { FetchError } from './fetchError';
import type { ResponseWithMessage } from './response.type';

const mode = import.meta.env.MODE;

const devHost = 'http://localhost:3000';
const prodHost: string | undefined = import.meta.env.VITE_PROD_HOST;

if (mode === 'production' && !prodHost) {
	throw new Error("'VITE_PROD_HOST' env variable not provided");
}

const host: string = mode === 'production' ? prodHost! : devHost;
const apiUrl = '/api/v1';

export async function fetchClient<T, B = undefined>(
	endpoint: string,
	method: HttpMetod = 'GET',
	body?: B
): Promise<{ response: T; statusCode: number }> {
	try {
		const res = await fetch(`${host}${apiUrl}${endpoint}`, {
			credentials: 'include',
			mode: 'cors',
			method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: body ? JSON.stringify(body) : undefined,
		});
		const statusCode = res.status;

		if (!res.ok) {
			const errorResponse = await res.json().catch(() => null);
			throw new FetchError(
				errorResponse?.message || 'Unexpected error',
				statusCode
			);
		}
		const response = (await res.json()) as T;
		return { response, statusCode: res.status };
	} catch (error) {
		if (error instanceof FetchError) {
			throw error; // Propagar errores FetchError directamente
		}
		throw new FetchError("Server doesn't respond", 500);
	}
}

// getter for endpoints
export const authBase = (endpoint: string) => `/auth${endpoint}`;
export const notesBase = (endpoint: string) => `/notes${endpoint}`;
export const adminUsersBase = (endpoint: string) => `/admin/users${endpoint}`;

type HttpMetod = 'GET' | 'POST' | 'PUT' | 'DELETE';
