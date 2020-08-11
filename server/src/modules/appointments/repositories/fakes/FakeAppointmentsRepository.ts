import { uuid } from 'uuidv4'
import { isEqual, getMonth, getYear } from 'date-fns'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'

class AppointmentsRepository implements IAppointmentsRepository {
	private appointments: Appointment[] = []

	public async findByDate(date: Date) {
		const appointment = this.appointments.find(appointment =>
			isEqual(appointment.date, date)
		)

		return appointment
	}

	public async findAllInMonthFromProvider({
		provider_id,
		month,
		year,
	}: IFindAllInMonthFromProviderDTO) {
		const appointments = this.appointments.filter(appointment => {
			return (
				appointment.provider_id === provider_id &&
				getMonth(appointment.date) + 1 === month &&
				getYear(appointment.date) === year
			)
		})

		return appointments
	}

	public async create({ provider_id, date }: ICreateAppointmentDTO) {
		const appointment = new Appointment()

		appointment.id = uuid()
		appointment.provider_id = provider_id
		appointment.date = date

		this.appointments.push(appointment)

		return appointment
	}
}

export default AppointmentsRepository
