import { uuid } from 'uuidv4'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import User from '@modules/users/infra/typeorm/entities/User'

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO'

class FakeUsersRepository implements IUsersRepository {
	private users: User[] = []

	public async findById(id: string) {
		const user = this.users.find(user => user.id === id)

		return user
	}

	public async findByEmail(email: string) {
		const user = this.users.find(user => user.email === email)

		return user
	}

	public async findAllProviders({ except_user_id }: IFindAllProvidersDTO) {
		let { users } = this

		if (except_user_id) {
			users = this.users.filter(user => user.id !== except_user_id)
		}

		return users
	}

	public async create({ name, email, password }: ICreateUserDTO) {
		const user = new User()

		Object.assign(user, { id: uuid(), name, email, password })

		this.users.push(user)

		return user
	}

	public async save(user: User) {
		const findIndex = this.users.findIndex(findUser => findUser.id === user.id)

		this.users[findIndex] = user

		return user
	}
}

export default FakeUsersRepository
