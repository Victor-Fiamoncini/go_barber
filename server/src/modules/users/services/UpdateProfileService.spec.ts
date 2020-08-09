import UpdateProfileService from './UpdateProfileService'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'

import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let updateProfileService: UpdateProfileService

describe('UpdateUserAvatar', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository()
		fakeHashProvider = new FakeHashProvider()

		updateProfileService = new UpdateProfileService(
			fakeUsersRepository,
			fakeHashProvider
		)
	})

	it('should be able to update the profile', async () => {
		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@mail.com',
			password: '123456',
		})

		const updatedUser = await updateProfileService.execute({
			user_id: user.id,
			name: 'John Updated',
			email: 'john_updated@mail.com',
		})

		expect(updatedUser.name).toBe('John Updated')
		expect(updatedUser.email).toBe('john_updated@mail.com')
	})

	it('should not be able to update email with and existing one', async () => {
		await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@mail.com',
			password: '123456',
		})

		const user = await fakeUsersRepository.create({
			name: 'Test',
			email: 'test@mail.com',
			password: '654321',
		})

		await expect(
			updateProfileService.execute({
				user_id: user.id,
				name: 'Test',
				email: 'johndoe@mail.com',
			})
		).rejects.toBeInstanceOf(AppError)
	})

	it('should be able to update the password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@mail.com',
			password: '123456',
		})

		const updatedUser = await updateProfileService.execute({
			user_id: user.id,
			name: 'John Updated',
			email: 'john_updated@mail.com',
			password: '121212',
			old_password: '123456',
		})

		expect(updatedUser.password).toBe('121212')
	})

	it('should not be able to update user when old password is not provided', async () => {
		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@mail.com',
			password: '123456',
		})

		await expect(
			updateProfileService.execute({
				user_id: user.id,
				name: 'John Updated',
				email: 'john_updated@mail.com',
				password: '121212',
			})
		).rejects.toBeInstanceOf(AppError)
	})

	it('should not be able to update user with wrong old password', async () => {
		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@mail.com',
			password: '123456',
		})

		await expect(
			updateProfileService.execute({
				user_id: user.id,
				name: 'John Updated',
				email: 'john_updated@mail.com',
				password: '121212',
				old_password: 'WRONG_PASSWORD',
			})
		).rejects.toBeInstanceOf(AppError)
	})
})
