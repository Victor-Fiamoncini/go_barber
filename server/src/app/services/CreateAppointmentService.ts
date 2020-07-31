import { startOfHour } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository'

interface Request {
	provider: string
	date: Date
}

class CreateAppointmentService {
	private appointmentsRepository: AppointmentsRepository

	public constructor(appointmentsRepository: AppointmentsRepository) {
		this.appointmentsRepository = appointmentsRepository
	}

	public execute({ date, provider }: Request) {
		const appointmentDate = startOfHour(date)

		const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
			appointmentDate
		)

		if (findAppointmentInSameDate) {
			throw new Error('This appointment is already booked')
		}

		const appointment = this.appointmentsRepository.create({
			provider,
			date: appointmentDate,
		})

		return appointment
	}
}

export default CreateAppointmentService
