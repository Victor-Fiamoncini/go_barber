import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import { parseISO } from 'date-fns'

import AppointmentsRepository from '../app/repositories/AppointmentsRepository'
import CreateAppointmentService from '../app/services/CreateAppointmentService'

import ensureAuthenticated from '../app/middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (request, response) => {
	try {
		const appointmentsRepository = getCustomRepository(AppointmentsRepository)

		const appointments = await appointmentsRepository.find()

		if (!appointments.length) {
			return response.status(404).json({ error: 'Appointments not found' })
		}

		return response.status(200).json(appointments)
	} catch (err) {
		return response.status(400).json({ error: err.message })
	}
})

appointmentsRouter.post('/', async (request, response) => {
	const { provider_id, date } = request.body

	try {
		const parsedDate = parseISO(date)

		const appointment = await new CreateAppointmentService().execute({
			provider_id,
			date: parsedDate,
		})

		return response.status(201).json(appointment)
	} catch (err) {
		return response.status(400).json({ error: err.message })
	}
})

export default appointmentsRouter
