import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useTheme } from 'styled-components'

import { useAuth } from '../context/AuthContext'

import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'

const Routes: React.FC = () => {
	const { user, loading } = useAuth()
	const { colors } = useTheme()

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size="large" color={colors.primary} />
			</View>
		)
	}

	return user ? <AppRoutes /> : <AuthRoutes />
}

export default Routes
