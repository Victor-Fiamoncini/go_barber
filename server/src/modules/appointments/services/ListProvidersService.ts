import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

interface IRequest {
	user_id: string
}

@injectable()
class ListProvidersService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	public async execute({ user_id }: IRequest) {
		const users = await this.usersRepository.findAllProviders({
			except_user_id: user_id,
		})

		return users
	}
}

export default ListProvidersService
