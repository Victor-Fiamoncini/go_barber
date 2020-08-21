import CreateAppointmentService from './CreateAppointmentService'

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

import AppError from '@shared/errors/AppError'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointmentService: CreateAppointmentService
let fakeNotificationRepository: FakeNotificationRepository
let fakeCacheProvider: FakeCacheProvider

describe('CreateAppointment', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository()
		fakeNotificationRepository = new FakeNotificationRepository()
		fakeCacheProvider = new FakeCacheProvider()

		createAppointmentService = new CreateAppointmentService(
			fakeAppointmentsRepository,
			fakeNotificationRepository,
			fakeCacheProvider
		)
	})

	it('should be able to create an appointment', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 12).getTime()
		})

		const appointment = await createAppointmentService.execute({
			date: new Date(2020, 4, 10, 13),
			provider_id: 'provider-id',
			user_id: 'user-id',
		})

		expect(appointment).toHaveProperty('id')
		expect(appointment.provider_id).toBe('provider-id')
	})

	it('should not be able to create appointments on the same date', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 12).getTime()
		})

		const appointmentDate = new Date(2020, 4, 10, 13)

		await createAppointmentService.execute({
			date: appointmentDate,
			provider_id: 'provider-id',
			user_id: 'user-id',
		})

		await expect(
			createAppointmentService.execute({
				date: appointmentDate,
				provider_id: 'user-id',
				user_id: 'user-id',
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
				provider_id: 'provider-id',
				user_id: 'user-id',
			})
		).rejects.toBeInstanceOf(AppError)
	})

	it('should not be able to create an appointment with same user as provider', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 12).getTime()
		})

		await expect(
			createAppointmentService.execute({
				date: new Date(2020, 4, 10, 13),
				provider_id: 'user-id',
				user_id: 'user-id',
			})
		).rejects.toBeInstanceOf(AppError)
	})

	it('should not be able to create an appointment before 8am and after 5pm', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 10, 12).getTime()
		})

		await expect(
			createAppointmentService.execute({
				date: new Date(2020, 4, 11, 7),
				provider_id: 'provider-id',
				user_id: 'user-id',
			})
		).rejects.toBeInstanceOf(AppError)

		await expect(
			createAppointmentService.execute({
				date: new Date(2020, 4, 11, 18),
				provider_id: 'provider-id',
				user_id: 'user-id',
			})
		).rejects.toBeInstanceOf(AppError)
	})
})
