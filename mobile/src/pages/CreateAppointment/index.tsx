import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Platform } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import DateTimePicker from '@react-native-community/datetimepicker'

import { useAuth } from '../../context/auth'

import apiClient from '../../services/apiClient'
import defaultAvatar from '../../assets/default-avatar.png'

import { RouteParams, Provider, AvailabilityItem } from './types'

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
	CalendarContainer,
	CalendarTitle,
	OpenDatePickerButton,
	OpenDatePickerButtonText,
	Title,
	Schedule,
	Section,
	SectionTitle,
	SectionContent,
} from './styles'
import { format } from 'date-fns'

const CreateAppointment: React.FC = () => {
	const route = useRoute()
	const { providerId } = route.params as RouteParams

	const [providers, setProviders] = useState<Provider[]>([])
	const [selectedProvider, setSelectedProvider] = useState(providerId)
	const [showDatePicker, setShowDatePicker] = useState(false)
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [availability, setAvailability] = useState<AvailabilityItem[]>([])

	const { user } = useAuth()
	const { goBack } = useNavigation()

	const { colors } = useTheme()

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

	const handleToggleDatePicker = useCallback(() => {
		setShowDatePicker(state => !state)
	}, [])

	const handleDateChanged = useCallback((_: any, date: Date | undefined) => {
		if (Platform.OS === 'android') {
			setShowDatePicker(false)
		}

		if (date) {
			setSelectedDate(date)
		}
	}, [])

	const morningAvailability = useMemo(() => {
		return availability
			.filter(({ hour }) => hour < 12)
			.map(({ hour, available }) => ({
				hour,
				available,
				hourFormatted: format(new Date().setHours(hour), 'HH:00'),
			}))
	}, [availability])

	const afternoonAvailability = useMemo(() => {
		return availability
			.filter(({ hour }) => hour >= 12)
			.map(({ hour, available }) => ({
				hour,
				available,
				hourFormatted: format(new Date().setHours(hour), 'HH:00'),
			}))
	}, [availability])

	useEffect(() => {
		apiClient.get('/providers').then(response => {
			setProviders(response.data)
		})
	}, [])

	useEffect(() => {
		apiClient
			.get(`/providers/${selectedProvider}/day-availability`, {
				params: {
					year: selectedDate.getFullYear(),
					month: selectedDate.getMonth() + 1,
					day: selectedDate.getDate(),
				},
			})
			.then(response => {
				setAvailability(response.data)
			})
	}, [selectedDate, selectedProvider])

	return (
		<Container>
			<Header>
				<BackButton onPress={navigateBack}>
					<Feather name="chevron-left" size={24} color={colors.quinary} />
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
			<CalendarContainer>
				<CalendarTitle>Escolha a data</CalendarTitle>
				<OpenDatePickerButton onPress={handleToggleDatePicker}>
					<OpenDatePickerButtonText>
						Selecionar outra data
					</OpenDatePickerButtonText>
				</OpenDatePickerButton>
				{showDatePicker && (
					<DateTimePicker
						mode="date"
						display="calendar"
						value={selectedDate}
						onChange={handleDateChanged}
					/>
				)}
			</CalendarContainer>
			<Schedule>
				<Title>Escolha um horário</Title>
				<Section>
					<SectionTitle>Manhã</SectionTitle>
					<SectionContent></SectionContent>
				</Section>
				<Section>
					<SectionTitle>Tarde</SectionTitle>
					<SectionContent></SectionContent>
				</Section>
			</Schedule>
			{morningAvailability.map(availability => (
				<Title key={availability.hourFormatted}>
					{availability.hourFormatted}
				</Title>
			))}
			{afternoonAvailability.map(availability => (
				<Title key={availability.hourFormatted}>
					{availability.hourFormatted}
				</Title>
			))}
		</Container>
	)
}

export default CreateAppointment
