import 'react-native-gesture-handler'

import React from 'react'
import { View } from 'react-native'
import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'

import Routes from './routes'

import robotoSlabRegular from '../assets/fonts/RobotoSlab-Regular.ttf'
import robotoSlabMedium from '../assets/fonts/RobotoSlab-Medium.ttf'

const App: React.FC = () => {
	const [isLoaded] = useFonts({
		'RobotoSlab-Regular': robotoSlabRegular,
		'RobotoSlab-Medium': robotoSlabMedium,
	})

	return (
		<NavigationContainer>
			<StatusBar style="light" backgroundColor="#312e38" />
			{isLoaded && (
				<View style={{ flex: 1, backgroundColor: '#312e38' }}>
					<Routes />
				</View>
			)}
		</NavigationContainer>
	)
}

export default registerRootComponent(App)
