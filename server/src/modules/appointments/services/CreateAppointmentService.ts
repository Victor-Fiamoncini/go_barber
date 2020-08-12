import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { startOfHour, isBefore } from 'date-fns'

import AppError from '@shared/errors/AppError'
import IAppointmentesRepository from '@modules/appointments/repositories/IAppointmentsRepository'

interface IRequest {
	provider_id: string
	user_id: string
	date: Date
}

@injectable()
class CreateAppointmentService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentesRepository
	) {}

	public async execute({ date, provider_id, user_id }: IRequest) {
		const appointmentDate = startOfHour(date)

		if (isBefore(appointmentDate, Date.now())) {
			throw new AppError('You cannot create an appointment on a past date')
		}

		const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
			appointmentDate
		)

		if (findAppointmentInSameDate) {
			throw new AppError('This appointment is already booked')
		}

		const appointment = await this.appointmentsRepository.create({
			provider_id,
			user_id,
			date: appointmentDate,
		})

		return appointment
	}
}

export default CreateAppointmentService
