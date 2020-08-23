import React from 'react'
import { FiPower, FiClock } from 'react-icons/fi'

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

const Dashboard: React.FC = () => {
	const { signOut, user } = useAuth()

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
				<Calendar />
			</Content>
		</Container>
	)
}

export default Dashboard
