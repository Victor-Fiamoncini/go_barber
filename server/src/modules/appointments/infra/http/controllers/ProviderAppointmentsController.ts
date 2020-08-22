import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService'

class ProviderAppointmentsController {
	public async index(request: Request, response: Response) {
		const provider_id = request.user.id
		const { day, month, year } = request.query

		const appointments = await container
			.resolve(ListProviderAppointmentsService)
			.execute({
				provider_id,
				day: Number(day),
				month: Number(month),
				year: Number(year),
			})

		return response.status(200).json(classToClass(appointments))
	}
}

export default ProviderAppointmentsController
