import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'

import { useAuth } from '../../context/auth'

import apiClient from '../../services/apiClient'
import defaultAvatar from '../../assets/default-avatar.png'

import { Provider } from './types'

import {
	Container,
	Header,
	HeaderTitle,
	ProfileButton,
	UserAvatar,
	UserName,
	ProvidersList,
	ProviderContainer,
	ProviderAvatar,
	ProviderInfo,
	ProviderName,
	ProviderMeta,
	ProviderMetaText,
	ProvidersListTitle,
} from './styles'

const Dashboard: React.FC = () => {
	const [providers, setProviders] = useState<Provider[]>([])

	const { user } = useAuth()
	const { navigate } = useNavigation()

	const { colors } = useTheme()

	const navigateToProfile = useCallback(() => {
		navigate('Profile')
	}, [navigate])

	const navigateToCreateAppointment = useCallback(
		(providerId: string) => {
			navigate('CreateAppointment', { providerId })
		},
		[navigate]
	)

	const userAvatar = useMemo(() => {
		return user.avatar_url ? { uri: user.avatar_url } : defaultAvatar
	}, [user.avatar_url])

	const providerAvatar = useCallback((avatar: string) => {
		return avatar ? { uri: avatar } : defaultAvatar
	}, [])

	useEffect(() => {
		apiClient.get('/providers').then(response => {
			setProviders(response.data)
		})
	}, [])

	return (
		<Container>
			<Header>
				<HeaderTitle>
					Bem vindo, {'\n'}
					<UserName>{user.name}</UserName>
				</HeaderTitle>
				<ProfileButton onPress={navigateToProfile}>
					<UserAvatar source={userAvatar} />
				</ProfileButton>
			</Header>
			<ProvidersList
				data={providers}
				keyExtractor={provider => provider.id}
				ListHeaderComponent={
					<ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
				}
				renderItem={({ item: provider }) => (
					<ProviderContainer
						onPress={() => navigateToCreateAppointment(provider.id)}
					>
						<ProviderAvatar source={providerAvatar(provider.avatar_url)} />
						<ProviderInfo>
							<ProviderName>{provider.name}</ProviderName>
							<ProviderMeta>
								<Feather name="calendar" size={14} color={colors.primary} />
								<ProviderMetaText>Segunda à sexta</ProviderMetaText>
							</ProviderMeta>
							<ProviderMeta>
								<Feather name="clock" size={14} color={colors.primary} />
								<ProviderMetaText>8h às 18h</ProviderMetaText>
							</ProviderMeta>
						</ProviderInfo>
					</ProviderContainer>
				)}
			/>
		</Container>
	)
}

export default Dashboard
