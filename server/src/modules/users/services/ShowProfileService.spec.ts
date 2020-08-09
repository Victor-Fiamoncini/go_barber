import ShowProfileService from './ShowProfileService'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let showProfileService: ShowProfileService

describe('ShowProfile', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository()

		showProfileService = new ShowProfileService(fakeUsersRepository)
	})

	it('should be able to show the profile', async () => {
		const user = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@mail.com',
			password: '123456',
		})

		const profile = await showProfileService.execute({
			user_id: user.id,
		})

		expect(profile.name).toBe('John Doe')
		expect(profile.email).toBe('johndoe@mail.com')
	})

	it('should not be able to show profile from non-existing user', async () => {
		await expect(
			showProfileService.execute({
				user_id: 'non-existing-id',
			})
		).rejects.toBeInstanceOf(AppError)
	})
})
