import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { parseISO } from 'date-fns'

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'

class AppointmentsController {
	public async create(request: Request, response: Response) {
		const { provider_id, date } = request.body

		const parsedDate = parseISO(date)

		const appointment = await container
			.resolve(CreateAppointmentService)
			.execute({
				provider_id,
				date: parsedDate,
			})

		return response.status(201).json(appointment)
	}
}

export default AppointmentsController
