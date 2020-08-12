import { uuid } from 'uuidv4'
import { isEqual, getDate, getMonth, getYear } from 'date-fns'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'

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

	public async findAllInDayFromProvider({
		provider_id,
		day,
		month,
		year,
	}: IFindAllInDayFromProviderDTO) {
		const appointments = this.appointments.filter(appointment => {
			return (
				appointment.provider_id === provider_id &&
				getDate(appointment.date) === day &&
				getMonth(appointment.date) + 1 === month &&
				getYear(appointment.date) === year
			)
		})

		return appointments
	}

	public async create({ provider_id, user_id, date }: ICreateAppointmentDTO) {
		const appointment = new Appointment()

		appointment.id = uuid()
		appointment.provider_id = provider_id
		appointment.user_id = user_id
		appointment.date = date

		this.appointments.push(appointment)

		return appointment
	}
}

export default AppointmentsRepository
