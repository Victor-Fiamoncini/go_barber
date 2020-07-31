import { isEqual } from 'date-fns'

import Appointment from '../models/Appointment'

class AppointmentsRepository {
	private appointments: Appointment[]

	public constructor() {
		this.appointments = []
	}

	public all() {
		return this.appointments
	}

	public findByDate(date: Date) {
		const appointment = this.appointments.find(appointment =>
			isEqual(date, appointment.date)
		)

		return appointment || null
	}

	public create(provider: string, date: Date) {
		const appointment = new Appointment(provider, date)

		this.appointments.push(appointment)

		return appointment
	}
}

export default AppointmentsRepository
