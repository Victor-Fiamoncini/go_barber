import React, {
	useCallback,
	useContext,
	useEffect,
	useState,
	createContext,
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import apiClient from '../services/apiClient'

interface AuthState {
	token: string
	user: object
}

interface SignInCredentials {
	email: string
	password: string
}

interface AuthContextData {
	user: object
	signIn: (credentials: SignInCredentials) => Promise<void>
	signOut: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
	const [data, setData] = useState<AuthState>({} as AuthState)

	const signIn = useCallback(async ({ email, password }) => {
		const response = await apiClient.post('/sessions', { email, password })

		const { token, user } = response.data

		await AsyncStorage.multiSet([
			['@GoBarber:token', token],
			['@GoBarber:user', JSON.stringify(user)],
		])

		setData({ token, user })
	}, [])

	const signOut = useCallback(async () => {
		await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user'])

		setData({} as AuthState)
	}, [])

	useEffect(() => {
		async function loadStorageData() {
			const [token, user] = await AsyncStorage.multiGet([
				'@GoBarber:token',
				'@GoBarber:user',
			])

			const tokenData = token[1]
			const userData = user[1]

			if (tokenData && userData) {
				setData({
					token: tokenData,
					user: JSON.parse(userData),
				})
			}
		}

		loadStorageData()
	}, [])

	return (
		<AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth(): AuthContextData {
	const context = useContext(AuthContext)

	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}

	return context
}
