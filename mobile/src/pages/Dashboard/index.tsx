import React from 'react'
import { Button } from 'react-native'

import { Container } from './styles'
import { useAuth } from '../../context/AuthContext'

const Dashboard: React.FC = () => {
	const { signOut } = useAuth()

	return (
		<Container>
			<Button title="sair" onPress={signOut} />
		</Container>
	)
}

export default Dashboard
