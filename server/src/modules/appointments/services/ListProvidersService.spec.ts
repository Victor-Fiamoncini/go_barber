import ListProvidersService from './ListProvidersService'

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

let fakeUsersRepository: FakeUsersRepository
let listProfilesService: ListProvidersService

describe('ListProfiles', () => {
	beforeEach(() => {
		fakeUsersRepository = new FakeUsersRepository()

		listProfilesService = new ListProvidersService(fakeUsersRepository)
	})

	it('should be able to list the providers', async () => {
		const user1 = await fakeUsersRepository.create({
			name: 'John Doe',
			email: 'johndoe@mail.com',
			password: '123456',
		})

		const user2 = await fakeUsersRepository.create({
			name: 'John Tre',
			email: 'johntre@mail.com',
			password: '123456',
		})

		const loggedUser = await fakeUsersRepository.create({
			name: 'John Qua',
			email: 'johnqua@mail.com',
			password: '123456',
		})

		const providers = await listProfilesService.execute({
			user_id: loggedUser.id,
		})

		expect(providers).toEqual([user1, user2])
	})
})
