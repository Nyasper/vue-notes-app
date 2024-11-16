import type { LoginBody, RegisterBody } from './authService';
import type { ResponseWithMessage } from './response.type';

export function validateLogin(credentialts: LoginBody): ResponseWithMessage {
	const userDTOConsts = {
		username: {
			min: 3,
			max: 16,
		},
		password: {
			min: 5,
			max: 26,
		},
	};
	const { username, password } = credentialts;
	if (
		username.length < userDTOConsts.username.min ||
		username.length > userDTOConsts.username.max
	) {
		return {
			success: false,
			message: `Username must have between ${userDTOConsts.username.min} and ${userDTOConsts.username.max} characters`,
		};
	}
	if (
		password.length < userDTOConsts.password.min ||
		password.length > userDTOConsts.password.max
	) {
		return {
			success: false,
			message: `Password must have between ${userDTOConsts.password.min} and ${userDTOConsts.password.max} characters`,
		};
	}

	return {
		success: true,
		message: 'User logged successfully',
	};
}

export function validateRegister(
	credentialts: RegisterBody
): ResponseWithMessage {
	if (credentialts.password !== credentialts.password2) {
		return {
			success: false,
			message: "passwords doesn't match, please verify.",
		};
	}

	const loginResponse = validateLogin(credentialts);
	if (loginResponse.success)
		return {
			success: true,
			message: 'User registered successfully',
		};

	return loginResponse;
}
