import { isEqual } from 'date-fns'

import Appointment from '../models/Appointment'

interface CreateAppointmentDTO {
	provider: string
	date: Date
}

class AppointmentsRepository {
	private appointments: Appointment[]

	public constructor() {
		this.appointments = []
	}

	public findAll() {
		return this.appointments
	}

	public findByDate(date: Date) {
		const appointment = this.appointments.find(appointment =>
			isEqual(date, appointment.date)
		)

		return appointment || null
	}

	public create({ provider, date }: CreateAppointmentDTO) {
		const appointment = new Appointment({ provider, date })

		this.appointments.push(appointment)

		return appointment
	}
}

export default AppointmentsRepository
