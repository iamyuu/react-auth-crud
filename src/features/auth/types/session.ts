export interface AuthUser {
	name: string;
	email: string;
}

export interface AuthSession {
	token: string;
	user: AuthUser;
}
