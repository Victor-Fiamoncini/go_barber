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
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 12).getTime()
		})

		const appointment = await createAppointmentService.execute({
			date: new Date(2020, 4, 10, 13),
			provider_id: '111',
			user_id: '222',
		})

		expect(appointment).toHaveProperty('id')
		expect(appointment.provider_id).toBe('111')
	})

	it('should not be able to create appointments on the same date', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 12).getTime()
		})

		const appointmentDate = new Date(2020, 4, 10, 13)

		await createAppointmentService.execute({
			date: appointmentDate,
			provider_id: '111',
			user_id: '222',
		})

		await expect(
			createAppointmentService.execute({
				date: appointmentDate,
				provider_id: '222',
				user_id: '222',
			})
		).rejects.toBeInstanceOf(AppError)
	})

	it('should not be able to create an appointment on a past date', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 12).getTime()
		})

		await expect(
			createAppointmentService.execute({
				date: new Date(2020, 4, 10, 11),
				provider_id: '222',
				user_id: '222',
			})
		).rejects.toBeInstanceOf(AppError)
	})
})
