import axios from "./axios.js"

export async function register(credentials) {
	try {
		return await axios.post("user/register", credentials);
	} catch (error) {
		console.log(error);
	}
}

export async function login(credentials) {
	try {
		const response = await axios.post("user/login", credentials);
		console.log(response)
		return response
	} catch (error) {
		console.log(error);
	}
}

export async function logout() {
	try {
		return await axios.get("user/logout");
	} catch (error) {
		console.log(error);
	}
}


export async function isLogged() {
	try {
		const { data, status } = await axios.get('user/logged');
		const { logged } = data;

		if (status === 200 && logged) {
			return true
		}
		return false
	} catch (error) {
		console.log(error);
		return false
	}
}

export async function isAdmin() {
	try {
		const { data, status } = await axios.get('user/logged');
		const { logged, admin } = data;
		if (status === 200 && logged && admin) {
			return true
		}
		return false
	} catch (error) {
		console.log(error);
		return false
	}
}
