import UpdateUserAvatarService from './UpdateUserAvatarService'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'

import AppError from '@shared/errors/AppError'

describe('UpdateUserAvatar', () => {
	it('should be able to update a user avatar', async () => {
		const fakeUsersRepository = new FakeUsersRepository()
		const fakeStorageProvider = new FakeStorageProvider()

		const updateUserAvatarService = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider
		)

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
		const fakeUsersRepository = new FakeUsersRepository()
		const fakeStorageProvider = new FakeStorageProvider()

		const updateUserAvatarService = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider
		)

		await expect(
			updateUserAvatarService.execute({
				user_id: 'non-existing-id',
				avatarFilename: 'avatar.jpg',
			})
		).rejects.toBeInstanceOf(AppError)
	})

	it('should delete old avatar when updating new one', async () => {
		const fakeUsersRepository = new FakeUsersRepository()
		const fakeStorageProvider = new FakeStorageProvider()

		const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

		const updateUserAvatarService = new UpdateUserAvatarService(
			fakeUsersRepository,
			fakeStorageProvider
		)

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
