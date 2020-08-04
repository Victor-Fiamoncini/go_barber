import { uuid } from 'uuidv4'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

class AppointmentsRepository implements IAppointmentsRepository {
	private appointments: Appointment[] = []

	public async findByDate(date: Date) {
		const appointment = this.appointments.find(
			appointment => appointment.date === date
		)

		return appointment
	}

	public async create({ provider_id, date }: ICreateAppointmentDTO) {
		const appointment = new Appointment()

		Object.assign(appointment, {
			id: uuid(),
			provider_id,
			date,
		})

		this.appointments.push(appointment)

		return appointment
	}
}

export default AppointmentsRepository
