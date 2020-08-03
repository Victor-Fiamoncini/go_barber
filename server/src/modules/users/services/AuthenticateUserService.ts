import { injectable, inject } from 'tsyringe'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import AppError from '@shared/errors/AppError'
import authConfig from '@config/auth'

interface IRequest {
	email: string
	password: string
}

@injectable()
class AuthenticateUserService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository
	) {}

	public async execute({ email, password }: IRequest) {
		const user = await this.usersRepository.findByEmail(email)

		if (!user) {
			throw new AppError('Incorrect email/password combination', 401)
		}

		const passwordMatched = await compare(password, user.password)

		if (!passwordMatched) {
			throw new AppError('Incorrect email/password combination', 401)
		}

		const { secret, expiresIn } = authConfig.jwt

		const token = sign({}, secret, {
			subject: user.id,
			expiresIn,
		})

		return {
			user,
			token,
		}
	}
}

export default AuthenticateUserService
