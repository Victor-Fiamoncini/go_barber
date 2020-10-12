import React, { useCallback } from 'react'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

import { Container, Title, Description, OkButton, OkButtonText } from './styles'
import { useNavigation } from '@react-navigation/native'

const AppointmentCreated: React.FC = () => {
	const { colors } = useTheme()
	const { reset } = useNavigation()

	const handleOkPressed = useCallback(() => {
		reset({
			routes: [{ name: 'Dashboard' }],
			index: 0,
		})
	}, [reset])

	return (
		<Container>
			<Feather name="check" size={80} color={colors.nonary} />
			<Title>Agendamento concluído</Title>
			<Description>Agendamento concluído</Description>
			<OkButton onPress={handleOkPressed}>
				<OkButtonText>Ok</OkButtonText>
			</OkButton>
		</Container>
	)
}

export default AppointmentCreated
