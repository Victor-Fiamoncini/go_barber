import { Router } from 'express'
import { parseISO } from 'date-fns'

import AppointmentsRepository from '../app/repositories/AppointmentsRepository'
import CreateAppointmentService from '../app/services/CreateAppointmentService'
import { getCustomRepository } from 'typeorm'

const appointmentsRouter = Router()

appointmentsRouter.get('/', async (request, response) => {
	const appointmentsRepository = getCustomRepository(AppointmentsRepository)

	const appointments = await appointmentsRepository.find()

	return response.status(200).json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {
	const { provider, date } = request.body

	try {
		const parsedDate = parseISO(date)

		const createAppointment = new CreateAppointmentService()

		const appointment = await createAppointment.execute({
			provider,
			date: parsedDate,
		})

		return response.status(201).json(appointment)
	} catch (err) {
		return response.status(400).json({ error: err.message })
	}
})

export default appointmentsRouter
