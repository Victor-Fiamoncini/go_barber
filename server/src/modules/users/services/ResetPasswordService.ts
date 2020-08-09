import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { isAfter, addHours } from 'date-fns'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'

import AppError from '@shared/errors/AppError'

interface IRequest {
	token: string
	password: string
}

@injectable()
class ResetPasswordEmailService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('UsersTokensRepository')
		private usersTokensRepository: IUsersTokensRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider
	) {}

	public async execute({ token, password }: IRequest) {
		const userToken = await this.usersTokensRepository.findByToken(token)

		if (!userToken) {
			throw new AppError('User token does not exists')
		}

		const user = await this.usersRepository.findById(userToken.user_id)

		if (!user) {
			throw new AppError('User does not exists')
		}

		const tokenCreatedAt = userToken.created_at
		const increasedTokenCreatedAt = addHours(tokenCreatedAt, 2)

		if (isAfter(Date.now(), increasedTokenCreatedAt)) {
			throw new AppError('Token expired')
		}

		user.password = await this.hashProvider.generateHash(password)

		await this.usersRepository.save(user)
	}
}

export default ResetPasswordEmailService
