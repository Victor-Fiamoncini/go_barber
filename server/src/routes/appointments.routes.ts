import { Router } from 'express'
import { parseISO } from 'date-fns'

import AppointmentsRepository from '../app/repositories/AppointmentsRepository'

import CreateAppointmentService from '../app/services/CreateAppointmentService'

const appointmentsRouter = Router()
const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.get('/', (request, response) => {
	const appointments = appointmentsRepository.findAll()

	return response.status(200).json(appointments)
})

appointmentsRouter.post('/', (request, response) => {
	const { provider, date } = request.body

	try {
		const parsedDate = parseISO(date)

		const createAppointment = new CreateAppointmentService(
			appointmentsRepository
		)

		const appointment = createAppointment.execute({
			provider,
			date: parsedDate,
		})

		return response.status(201).json(appointment)
	} catch (err) {
		return response.status(400).json({ error: err.message })
	}
})

export default appointmentsRouter
