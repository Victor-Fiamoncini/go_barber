import CreateAppointmentService from './CreateAppointmentService'

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'

import AppError from '@shared/errors/AppError'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointmentService: CreateAppointmentService

describe('CreateAppointment', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository()

		createAppointmentService = new CreateAppointmentService(
			fakeAppointmentsRepository
		)
	})

	it('should be able to create an appointment', async () => {
		const appointment = await createAppointmentService.execute({
			date: new Date(),
			provider_id: '111',
		})

		expect(appointment).toHaveProperty('id')
		expect(appointment.provider_id).toBe('111')
	})

	it('should be able to create an appointment', async () => {
		const appointmentDate = new Date(2020, 0, 10, 11)

		await createAppointmentService.execute({
			date: appointmentDate,
			provider_id: '111',
		})

		await expect(
			createAppointmentService.execute({
				date: appointmentDate,
				provider_id: '222',
			})
		).rejects.toBeInstanceOf(AppError)
	})
})
