import UpdateUserAvatarService from './UpdateUserAvatarService'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'

import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeStorageProvider: FakeStorageProvider
let updateUserAvatarService: UpdateUserAvatarService

describe('UpdateUserAvatar', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository()
		fakeStorageProvider = new FakeStorageProvider()

		updateUserAvatarService = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider
		)
	})

	it('should be able to update a user avatar', async () => {
		const user = await fakeUsersRepository.create({
			name: 'John Dow',
			email: 'johndoe@mail.com',
			password: '123456',
		})

		await updateUserAvatarService.execute({
			user_id: user.id,
			avatarFilename: 'avatar.jpg',
		})

		expect(user.avatar).toBe('avatar.jpg')
	})

	it('should not be able to update avatar for non existing user', async () => {
		await expect(
			updateUserAvatarService.execute({
				user_id: 'non-existing-id',
				avatarFilename: 'avatar.jpg',
			})
		).rejects.toBeInstanceOf(AppError)
	})

	it('should delete old avatar when updating new one', async () => {
		const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

		const user = await fakeUsersRepository.create({
			name: 'John Dow',
			email: 'johndoe@mail.com',
			password: '123456',
		})

		await updateUserAvatarService.execute({
			user_id: user.id,
			avatarFilename: 'avatar.jpg',
		})

		await updateUserAvatarService.execute({
			user_id: user.id,
			avatarFilename: 'avatar2.jpg',
		})

		expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
		expect(user.avatar).toBe('avatar2.jpg')
	})
})
