import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { getHours, isAfter } from 'date-fns'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import { da } from 'date-fns/locale'

interface IRequest {
	provider_id: string
	day: number
	month: number
	year: number
}

@injectable()
class ListProviderDayAvailabilityService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository
	) {}

	public async execute({ provider_id, day, month, year }: IRequest) {
		const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
			{
				provider_id,
				day,
				month,
				year,
			}
		)

		const hourStart = 8

		const eachHour = Array.from(
			{ length: 10 },
			(value, index) => index + hourStart
		)

		const currentDate = new Date(Date.now())

		const availabilities = eachHour.map(hour => {
			const hasAppointmentIhHour = appointments.find(
				appointment => getHours(appointment.date) === hour
			)

			const compareDate = new Date(year, month - 1, day, hour)

			return {
				hour,
				available: !hasAppointmentIhHour && isAfter(compareDate, currentDate),
			}
		})

		return availabilities
	}
}

export default ListProviderDayAvailabilityService
