export interface User {
	id: string;
	username: string;
	admin: boolean;
}

export interface UserInfo {
	id?: string;
	username?: string;
	admin?: boolean;
	exp?: number;
}
