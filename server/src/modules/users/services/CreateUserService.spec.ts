import CreateUserService from './CreateUserService'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'

import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createUserService: CreateUserService
let fakeCacheProvider: FakeCacheProvider

describe('CreateUser', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository()
		fakeHashProvider = new FakeHashProvider()
		fakeCacheProvider = new FakeCacheProvider()

		createUserService = new CreateUserService(
			fakeUsersRepository,
			fakeHashProvider,
			fakeCacheProvider
		)
	})

	it('should be able to create an user', async () => {
		const user = await createUserService.execute({
			name: 'John Doe',
			email: 'johndoe@mail.com',
			password: '123456',
		})

		expect(user).toHaveProperty('id')
	})

	it('should not be able to create an user with same email from another one', async () => {
		await createUserService.execute({
			name: 'John Doe',
			email: 'johndoe@mail.com',
			password: '123456',
		})

		await expect(
			createUserService.execute({
				name: 'John Doe',
				email: 'johndoe@mail.com',
				password: '123456',
			})
		).rejects.toBeInstanceOf(AppError)
	})
})
