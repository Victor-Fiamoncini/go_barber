import React, {
	useCallback,
	useContext,
	useEffect,
	useState,
	createContext,
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import apiClient from '../../services/apiClient'

import { AuthContextData, AuthState, User } from './types'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
	const [data, setData] = useState<AuthState>({} as AuthState)
	const [loading, setLoading] = useState(true)

	const signIn = useCallback(async ({ email, password }) => {
		const response = await apiClient.post('/sessions', { email, password })

		const { token, user } = response.data

		await AsyncStorage.multiSet([
			['@GoBarber:token', token],
			['@GoBarber:user', JSON.stringify(user)],
		])

		apiClient.defaults.headers['authorization'] = `Bearer ${token}`

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

				apiClient.defaults.headers['authorization'] = `Bearer ${tokenData}`
			}

			setLoading(false)
		}

		loadStorageData()
	}, [])

	const updateUser = useCallback(
		async (user: User) => {
			await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user))

			setData({
				token: data.token,
				user,
			})
		},
		[setData, data.token]
	)

	return (
		<AuthContext.Provider
			value={{ user: data.user, loading, signIn, signOut, updateUser }}
		>
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
