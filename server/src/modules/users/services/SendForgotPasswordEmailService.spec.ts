import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUsersTokensRepository'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'

import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let fakeMailProvider: FakeMailProvider
let sendForgotPasswordEmailService: SendForgotPasswordEmailService

describe('SendForgotPasswordEmail', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository()
		fakeMailProvider = new FakeMailProvider()
		fakeUserTokensRepository = new FakeUserTokensRepository()

		sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
			fakeUsersRepository,
			fakeMailProvider,
			fakeUserTokensRepository
		)
	})

	it('should be able to recover the password using the email', async () => {
		const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

		await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@mail.com',
			password: '123456',
		})

		await sendForgotPasswordEmailService.execute({
			email: 'johndoe@mail.com',
		})

		expect(sendMail).toHaveBeenCalled()
	})

	it('should not be able to recover a non-existing user password', async () => {
		await expect(
			sendForgotPasswordEmailService.execute({
				email: 'debdnwued@mail.com',
			})
		).rejects.toBeInstanceOf(AppError)
	})

	it('should generate a forgot password token', async () => {
		const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate')

		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@mail.com',
			password: '123456',
		})

		await sendForgotPasswordEmailService.execute({
			email: 'johndoe@mail.com',
		})

		expect(generateToken).toHaveBeenCalledWith(user.id)
	})
})
