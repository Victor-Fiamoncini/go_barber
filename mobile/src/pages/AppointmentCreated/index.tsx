import React, { useCallback, useMemo } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { RouteParams } from './types'

import { Container, Title, Description, OkButton, OkButtonText } from './styles'

const AppointmentCreated: React.FC = () => {
	const { params } = useRoute()
	const routeParams = params as RouteParams

	const { colors } = useTheme()
	const { reset } = useNavigation()

	const handleOkPressed = useCallback(() => {
		reset({
			routes: [{ name: 'Dashboard' }],
			index: 0,
		})
	}, [reset])

	const formattedDate = useMemo(() => {
		return format(
			routeParams.date,
			// eslint-disable-next-line quotes
			"EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
			{ locale: ptBR }
		)
	}, [routeParams.date])

	return (
		<Container>
			<Feather name="check" size={80} color={colors.nonary} />
			<Title>Agendamento concluído</Title>
			<Description>{formattedDate}</Description>
			<OkButton onPress={handleOkPressed}>
				<OkButtonText>Ok</OkButtonText>
			</OkButton>
		</Container>
	)
}

export default AppointmentCreated
