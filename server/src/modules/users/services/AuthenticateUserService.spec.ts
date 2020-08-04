import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'

import AppError from '@shared/errors/AppError'

describe('AuthenticateUser', () => {
	it('should be able to authenticate', async () => {
		const fakeUsersRepository = new FakeUsersRepository()
		const fakeHashProvider = new FakeHashProvider()

		const createUserService = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider
		)
		const authenticateUserService = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider
		)

		const user = await createUserService.execute({
			name: 'John Doe',
			email: 'johndoe@mail.com',
			password: '123456',
		})

		const response = await authenticateUserService.execute({
			email: 'johndoe@mail.com',
			password: '123456',
		})

		expect(response).toHaveProperty('token')
		expect(response.user).toEqual(user)
	})
})