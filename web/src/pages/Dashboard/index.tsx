import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { FiPower, FiClock } from 'react-icons/fi'
import DayPicker, { DayModifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

import { useAuth } from '../../context/AuthContext'

import {
	Container,
	Header,
	HeaderContent,
	Profile,
	Content,
	Schedule,
	NextAppointment,
	Section,
	Appointment,
	Calendar,
} from './styles'

import logo from '../../assets/logo.svg'
import apiClient from '../../services/apiClient'

interface MonthAvailabilityItem {
	day: number
	available: boolean
}

const Dashboard: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [currentMonth, setCurrentMonth] = useState(new Date())
	const [monthAvailability, setMonthAvailability] = useState<
		MonthAvailabilityItem[]
	>([])

	const { signOut, user } = useAuth()

	const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
		if (modifiers.available) {
			setSelectedDate(day)
		}
	}, [])

	const handleMonthChange = useCallback((month: Date) => {
		setCurrentMonth(month)
	}, [])

	useEffect(() => {
		apiClient
			.get(`/providers/${user.id}/month-availability`, {
				params: {
					month: currentMonth.getMonth() + 1,
					year: currentMonth.getFullYear(),
				},
			})
			.then(response => {
				setMonthAvailability(response.data)
			})
	}, [currentMonth, user.id])

	const disabledDays = useMemo(() => {
		const dates = monthAvailability
			.filter(monthDay => monthDay.available === false)
			.map(monthDay => {
				return new Date(
					currentMonth.getFullYear(),
					currentMonth.getMonth(),
					monthDay.day
				)
			})

		return dates
	}, [currentMonth, monthAvailability])

	return (
		<Container>
			<Header>
				<HeaderContent>
					<img src={logo} alt="GoBarber" />
					<Profile>
						<img src={user.avatar_url} alt={`Perfil de ${user.name}`} />
						<div>
							<span>Bem-vindo</span>
							<strong>Victor Fiamoncini</strong>
						</div>
					</Profile>
					<button type="button" onClick={signOut}>
						<FiPower />
					</button>
				</HeaderContent>
			</Header>
			<Content>
				<Schedule>
					<h1>Horários agendados</h1>
					<p>
						<span>Hoje</span>
						<span>Dia 06</span>
						<span>Segunda-feira</span>
					</p>
					<NextAppointment>
						<strong>Atendimento a seguir</strong>
						<div>
							<img src={user.avatar_url} alt={`Perfil de ${user.name}`} />
							<strong>Diego Fernandes</strong>
							<span>
								<FiClock />
							</span>
						</div>
					</NextAppointment>
					<Section>
						<strong>Manhã</strong>
						<Appointment>
							<span>
								<FiClock />
								08:00
							</span>
							<div>
								<img src={user.avatar_url} alt={`Perfil de ${user.name}`} />
								<strong>Diego Fernandes</strong>
							</div>
						</Appointment>
						<Appointment>
							<span>
								<FiClock />
								08:00
							</span>
							<div>
								<img src={user.avatar_url} alt={`Perfil de ${user.name}`} />
								<strong>Diego Fernandes</strong>
							</div>
						</Appointment>
					</Section>
					<Section>
						<strong>Tarde</strong>
						<Appointment>
							<span>
								<FiClock />
								08:00
							</span>
							<div>
								<img src={user.avatar_url} alt={`Perfil de ${user.name}`} />
								<strong>Diego Fernandes</strong>
							</div>
						</Appointment>
					</Section>
				</Schedule>
				<Calendar>
					<DayPicker
						fromMonth={new Date()}
						disabledDays={[
							{
								daysOfWeek: [0, 6],
							},
							...disabledDays,
						]}
						modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
						selectedDays={selectedDate}
						onDayClick={handleDateChange}
						onMonthChange={handleMonthChange}
						weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
						months={[
							'Janeiro',
							'Fevereiro',
							'Março',
							'Abril',
							'Maio',
							'Junho',
							'Julho',
							'Agosto',
							'Setembro',
							'Outubro',
							'Novembro',
							'Dezembro',
						]}
					/>
				</Calendar>
			</Content>
		</Container>
	)
}

export default Dashboard
