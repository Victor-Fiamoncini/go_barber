import React from 'react'

import { Container } from './styles'
import { useAuth } from '../../context/AuthContext'

const Profile: React.FC = () => {
	const { user } = useAuth()

	return <Container></Container>
}

export default Profile
