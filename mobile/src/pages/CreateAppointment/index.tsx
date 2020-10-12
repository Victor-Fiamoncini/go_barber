import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Alert, Platform } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'
import DateTimePicker from '@react-native-community/datetimepicker'
import { format } from 'date-fns'

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
	Content,
	ProvidersListContainer,
	ProvidersList,
	ProviderContainer,
	ProviderAvatar,
	ProviderName,
	CalendarContainer,
	CalendarTitle,
	OpenDatePickerButton,
	OpenDatePickerButtonText,
	Schedule,
	ScheduleTitle,
	Section,
	SectionTitle,
	SectionContent,
	Hour,
	HourText,
	CreateAppointmentButton,
	CreateAppointmentButtonText,
} from './styles'

const CreateAppointment: React.FC = () => {
	const route = useRoute()
	const { providerId } = route.params as RouteParams

	const [providers, setProviders] = useState<Provider[]>([])
	const [selectedProvider, setSelectedProvider] = useState(providerId)
	const [showDatePicker, setShowDatePicker] = useState(false)
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [availability, setAvailability] = useState<AvailabilityItem[]>([])
	const [selectedHour, setSelectedHour] = useState(0)

	const { user } = useAuth()
	const { goBack, navigate } = useNavigation()

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

	const handleSelectHour = useCallback((hour: number) => {
		setSelectedHour(hour)
	}, [])

	const handleCreateAppointment = useCallback(async () => {
		try {
			const date = new Date(selectedDate)

			date.setHours(selectedHour)
			date.setMinutes(0)

			await apiClient.post('/appointments', {
				provider_id: selectedProvider,
				date,
			})

			navigate('AppointmentCreated', { date: date.getTime() })
		} catch (err) {
			Alert.alert(
				'Erro ao criar agendamento',
				'Occoreu um erro ao tentar criar um agendamento, tente novamente'
			)
		}
	}, [navigate, selectedDate, selectedHour, selectedProvider])

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
			<Content>
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
					<ScheduleTitle>Escolha o horário</ScheduleTitle>
					<Section>
						<SectionTitle>Manhã</SectionTitle>
						<SectionContent>
							{morningAvailability.map(({ hourFormatted, hour, available }) => (
								<Hour
									key={hourFormatted}
									enabled={available}
									selected={selectedHour === hour && available}
									available={available}
									onPress={() => handleSelectHour(hour)}
								>
									<HourText selected={selectedHour === hour && available}>
										{hourFormatted}
									</HourText>
								</Hour>
							))}
						</SectionContent>
					</Section>
					<Section>
						<SectionTitle>Tarde</SectionTitle>
						<SectionContent>
							{afternoonAvailability.map(
								({ hourFormatted, hour, available }) => (
									<Hour
										key={hourFormatted}
										enabled={available}
										selected={selectedHour === hour && available}
										available={available}
										onPress={() => handleSelectHour(hour)}
									>
										<HourText selected={selectedHour === hour && available}>
											{hourFormatted}
										</HourText>
									</Hour>
								)
							)}
						</SectionContent>
					</Section>
				</Schedule>
				<CreateAppointmentButton onPress={handleCreateAppointment}>
					<CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
				</CreateAppointmentButton>
			</Content>
		</Container>
	)
}

export default CreateAppointment
