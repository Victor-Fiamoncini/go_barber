import { getRepository, Repository, Not } from 'typeorm'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import User from '@modules/users/infra/typeorm/entities/User'

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO'

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

	public async findAllProviders({ except_user_id }: IFindAllProvidersDTO) {
		let users: User[]

		if (except_user_id) {
			users = await this.ormRepository.find({
				where: { id: Not(except_user_id) },
			})
		} else {
			users = await this.ormRepository.find()
		}

		return users
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
