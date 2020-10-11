import 'react-native-gesture-handler'

import React from 'react'
import { registerRootComponent } from 'expo'
import { useFonts } from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'

import AppProvider from './context'

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
			{isLoaded && (
				<AppProvider>
					<Routes />
				</AppProvider>
			)}
		</NavigationContainer>
	)
}

export default registerRootComponent(App)
