import { axiosInstance } from './axios';
import router from '../routes';
export async function register(credentials) {
	return await axiosInstance.post('user/register', credentials);
}

export async function generateToken(credentials) {
	const response = await axiosInstance.post('user/login', credentials);
	const { token } = response.data;
	if (!token) throw new Error('Error on generating token');
	localStorage.setItem('token', token);
	return token;
}

export async function auth(token) {
	try {
		if (!token) throw new Error('Token no Provided');

		const response = await axiosInstance.get('user/auth', {
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});
		return response.data;
	} catch (error) {
		localStorage.clear();
		return null;
	}
}

export function logout() {
	localStorage.clear();
	router.push({ name: 'login' });
}
