import { getRepository, Repository } from 'typeorm'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import User from '@modules/users/infra/typeorm/entities/User'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

class UsersRepository implements IUsersRepository {
	private ormRepository: Repository<User>

	constructor() {
		this.ormRepository = getRepository(User)
	}

	public async findById(id: string) {
		return await this.ormRepository.findOne(id)
	}

	public async findByEmail(email: string) {
		return await this.ormRepository.findOne({ where: { email } })
	}

	public async create({ name, email, password }: ICreateUserDTO) {
		const user = this.ormRepository.create({ name, email, password })

		await this.ormRepository.save(user)

		return user
	}

	public async save(user: User) {
		return await this.ormRepository.save(user)
	}
}

export default UsersRepository
