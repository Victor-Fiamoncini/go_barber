import { getRepository } from 'typeorm'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

import User from '../models/User'

interface Request {
	email: string
	password: string
}

class AuthenticateUserService {
	public async execute({ email, password }: Request) {
		const usersRepository = getRepository(User)

		const user = await usersRepository.findOne({ where: { email } })

		if (!user) {
			throw new Error('Incorrect email/password combination')
		}

		const passwordMatched = await compare(password, user.password)

		if (!passwordMatched) {
			throw new Error('Incorrect email/password combination')
		}

		const token = sign({}, '123j12ejxfwefjownediwenf', {
			subject: user.id,
			expiresIn: '1d',
		})

		return {
			user,
			token,
		}
	}
}

export default AuthenticateUserService
