import React from 'react'
import { View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useTheme } from 'styled-components'

import Routes from './routes'

const Wrapper: React.FC = () => {
	const { colors } = useTheme()

	return (
		<View style={{ flex: 1, backgroundColor: colors.background }}>
			<StatusBar style="light" backgroundColor={colors.background} />
			<Routes />
		</View>
	)
}

export default Wrapper
