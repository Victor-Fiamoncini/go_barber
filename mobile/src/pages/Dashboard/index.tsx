import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import { useAuth } from '../../context/AuthContext'

import apiClient from '../../services/apiClient'
import defaultAvatar from '../../assets/default-avatar.png'

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

export interface Provider {
	id: string
	name: string
	avatar_url: string
}

const Dashboard: React.FC = () => {
	const [providers, setProviders] = useState<Provider[]>([])

	const { user } = useAuth()

	const { navigate } = useNavigation()

	const navigateToProfile = useCallback(() => {
		navigate('Profile')
	}, [navigate])

	useEffect(() => {
		apiClient.get('/providers').then(response => {
			setProviders(response.data)
		})
	}, [])

	const userAvatar = useMemo(() => {
		return user.avatar_url ? { uri: user.avatar_url } : defaultAvatar
	}, [user.avatar_url])

	const providerAvatar = useCallback((avatar: string) => {
		return avatar ? { uri: avatar } : defaultAvatar
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
					<ProviderContainer>
						<ProviderAvatar source={providerAvatar(provider.avatar_url)} />
						<ProviderInfo>
							<ProviderName>{provider.name}</ProviderName>
							<ProviderMeta>
								<Feather name="calendar" size={14} color="#ff9000" />
								<ProviderMetaText>Segunda à sexta</ProviderMetaText>
							</ProviderMeta>
							<ProviderMeta>
								<Feather name="clock" size={14} color="#ff9000" />
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
