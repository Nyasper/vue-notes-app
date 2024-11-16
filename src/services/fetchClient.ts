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
): Promise<T> {
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

		return (await res.json()) as T;
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
}

export const errorServerDoesntRespond = (
	error: unknown
): ResponseWithMessage => {
	const message = "Error fetching data, server doesn't respond";
	if (error instanceof TypeError) {
		console.error(message, error);
	} else {
		console.error('Unexpected error:', error);
	}
	return {
		success: false,
		message,
	};
};

// getter for endpoints
export const authBase = (endpoint: string) => `/auth${endpoint}`;
export const notesBase = (endpoint: string) => `/notes${endpoint}`;
export const adminUsersBase = (endpoint: string) => `/admin/users${endpoint}`;

type HttpMetod = 'GET' | 'POST' | 'PUT' | 'DELETE';
