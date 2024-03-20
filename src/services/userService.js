import { axiosInstance } from "./axios.js"

export async function register(credentials) {
	try {
		return await axiosInstance.post("user/register", credentials);
	} catch (error) {
		console.log(error);
	}
}

export async function login(credentials) {
	try {
		const response = await axiosInstance.post("user/login", credentials);
		return response
	} catch (error) {
		console.log(error);
	}
}

export async function logout() {
	try {
		return await axiosInstance.get("user/logout");
	} catch (error) {
		console.log(error);
	}
}


export async function auth() {
	const response = await axiosInstance.get('user/logged');
	if (response.data) {
		return {
			logged: response.data.logged,
			admin: response.data.admin
		}
	}
	throw new Error('error on verifying logged')
}
