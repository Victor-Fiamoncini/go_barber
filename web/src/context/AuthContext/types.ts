export interface User {
	id: string
	name: string
	email: string
	avatar_url: string
}

export interface AuthState {
	user: User
	token: string
}

export interface SignInCredentials {
	email: string
	password: string
}

export interface AuthContextData {
	user: User
	signIn: (credentials: SignInCredentials) => Promise<void>
	signOut: () => void
	updateUser: (user: User) => void
}
