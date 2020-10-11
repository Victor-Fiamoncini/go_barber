import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useTheme } from 'styled-components'

import { useAuth } from '../context/auth'

import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

const Routes: React.FC = () => {
	const { user, loading } = useAuth()

	const { colors } = useTheme()

	return (
		<>
			<StatusBar style="light" backgroundColor={colors.background} />
			<View style={{ flex: 1, backgroundColor: colors.background }}>
				{loading ? (
					<View
						style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
					>
						<ActivityIndicator size="large" color={colors.primary} />
					</View>
				) : user ? (
					<AppRoutes />
				) : (
					<AuthRoutes />
				)}
			</View>
		</>
	)
}

export default Routes
