import React from 'react'
import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar'

const App: React.FC = () => {
	return <StatusBar style="dark" />
}

export default registerRootComponent(App)
