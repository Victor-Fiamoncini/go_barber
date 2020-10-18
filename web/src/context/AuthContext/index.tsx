import React, { useCallback, useContext, useState, createContext } from 'react'

import apiClient from '../../services/apiClient'

import { AuthContextData, AuthState, User } from './types'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
	const [data, setData] = useState<AuthState>(() => {
		const token = localStorage.getItem('@GoBarber:token')
		const user = localStorage.getItem('@GoBarber:user')

		if (token && user) {
			apiClient.defaults.headers.authorization = `Bearer ${token}`

			return {
				token,
				user: JSON.parse(user),
			}
		}

		localStorage.removeItem('@GoBarber:token')
		localStorage.removeItem('@GoBarber:user')

		return {} as AuthState
	})

	const signIn = useCallback(
		async ({ email, password }) => {
			const response = await apiClient.post('/sessions', { email, password })

			const { token, user } = response.data

			localStorage.setItem('@GoBarber:token', token)
			localStorage.setItem('@GoBarber:user', JSON.stringify(user))

			apiClient.defaults.headers.authorization = `Bearer ${token}`

			if (token && user) {
				setData({ token, user })
			}
		},
		[setData]
	)

	const signOut = useCallback(() => {
		localStorage.removeItem('@GoBarber:token')
		localStorage.removeItem('@GoBarber:user')

		setData({} as AuthState)
	}, [setData])

	const updateUser = useCallback(
		(user: User) => {
			localStorage.setItem('@GoBarber:token', data.token)
			localStorage.setItem('@GoBarber:user', JSON.stringify(user))

			setData({
				token: data.token,
				user,
			})
		},
		[setData, data.token]
	)

	return (
		<AuthContext.Provider
			value={{
				user: data.user,
				signIn,
				signOut,
				updateUser,
			}}
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
