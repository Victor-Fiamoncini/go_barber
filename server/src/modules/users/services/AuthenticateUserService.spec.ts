import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createUserService: CreateUserService
let authenticateUserService: AuthenticateUserService
let fakeCacheProvider: FakeCacheProvider

describe('AuthenticateUser', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository()
		fakeHashProvider = new FakeHashProvider()
		fakeCacheProvider = new FakeCacheProvider()

		createUserService = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
			fakeCacheProvider
		)

		authenticateUserService = new AuthenticateUserService(
			fakeUsersRepository,
			fakeHashProvider
		)
	})

	it('should be able to authenticate', async () => {
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

	it('should not be able to authenticate with non existing user', async () => {
		await expect(
			authenticateUserService.execute({
				email: 'johndoe@mail.com',
				password: '123456',
			})
		).rejects.toBeInstanceOf(AppError)
	})

	it('should not be able to authenticate with wrong password', async () => {
		await createUserService.execute({
			name: 'John Doe',
			email: 'johndoe@mail.com',
			password: '123456',
		})

		await expect(
			authenticateUserService.execute({
				email: 'johndoe@mail.com',
				password: 'wrongPassword',
			})
		).rejects.toBeInstanceOf(AppError)
	})
})
