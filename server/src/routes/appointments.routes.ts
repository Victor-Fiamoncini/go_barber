import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import { parseISO } from 'date-fns'

import AppointmentsRepository from '../app/repositories/AppointmentsRepository'
import CreateAppointmentService from '../app/services/CreateAppointmentService'

import ensureAuthenticated from '../app/middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (request, response) => {
	const appointmentsRepository = getCustomRepository(AppointmentsRepository)

	const appointments = await appointmentsRepository.find()

	if (!appointments.length) {
		return response.status(404).json({ error: 'Appointments not found' })
	}

	return response.status(200).json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
	const { provider_id, date } = request.body

	const parsedDate = parseISO(date)

	const appointment = await new CreateAppointmentService().execute({
		provider_id,
		date: parsedDate,
	})

	return response.status(201).json(appointment)
})

export default appointmentsRouter
