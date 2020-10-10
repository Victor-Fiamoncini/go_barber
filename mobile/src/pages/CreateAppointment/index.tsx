import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import { useAuth } from '../../context/AuthContext'

import apiClient from '../../services/apiClient'
import defaultAvatar from '../../assets/default-avatar.png'

import { RouteParams, Provider } from './types'

import {
	Container,
	Header,
	HeaderTitle,
	BackButton,
	UserAvatar,
	ProvidersListContainer,
	ProvidersList,
	ProviderContainer,
	ProviderAvatar,
	ProviderName,
} from './styles'

const CreateAppointment: React.FC = () => {
	const route = useRoute()
	const { providerId } = route.params as RouteParams

	const [providers, setProviders] = useState<Provider[]>([])
	const [selectedProvider, setSelectedProvider] = useState(providerId)

	const { user } = useAuth()
	const { goBack } = useNavigation()

	const navigateBack = useCallback(() => {
		goBack()
	}, [goBack])

	const userAvatar = useMemo(() => {
		return user.avatar_url ? { uri: user.avatar_url } : defaultAvatar
	}, [user.avatar_url])

	const providerAvatar = useCallback((avatar: string) => {
		return avatar ? { uri: avatar } : defaultAvatar
	}, [])

	const handleSelectProvider = useCallback((providerId: string) => {
		setSelectedProvider(providerId)
	}, [])

	useEffect(() => {
		apiClient.get('/providers').then(response => {
			setProviders(response.data)
		})
	}, [])

	return (
		<Container>
			<Header>
				<BackButton onPress={navigateBack}>
					<Feather name="chevron-left" size={24} color="#999591" />
				</BackButton>
				<HeaderTitle>Cabeleireiros</HeaderTitle>
				<UserAvatar source={userAvatar} />
			</Header>
			<ProvidersListContainer>
				<ProvidersList
					horizontal
					showsHorizontalScrollIndicator={false}
					data={providers}
					keyExtractor={provider => provider.id}
					renderItem={({ item: provider }) => (
						<ProviderContainer
							onPress={() => handleSelectProvider(provider.id)}
							selected={provider.id === selectedProvider}
						>
							<ProviderAvatar source={providerAvatar(provider.avatar_url)} />
							<ProviderName selected={provider.id === selectedProvider}>
								{provider.name}
							</ProviderName>
						</ProviderContainer>
					)}
				/>
			</ProvidersListContainer>
		</Container>
	)
}

export default CreateAppointment
