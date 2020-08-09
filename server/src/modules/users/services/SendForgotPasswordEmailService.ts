import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import path from 'path'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IUsersTokensRepository from '@modules/users/repositories/IUsersTokensRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'

import AppError from '@shared/errors/AppError'

interface IRequest {
	email: string
}

@injectable()
class SendForgotPasswordEmailService {
	constructor(
		@inject('UsersRepository')
		private usersRepository: IUsersRepository,

		@inject('MailProvider')
		private mailProvider: IMailProvider,

		@inject('UsersTokensRepository')
		private usersTokensRepository: IUsersTokensRepository
	) {}

	public async execute({ email }: IRequest) {
		const user = await this.usersRepository.findByEmail(email)

		if (!user) {
			throw new AppError('User does not exist')
		}

		const { token } = await this.usersTokensRepository.generate(user.id)

		const forgotPasswordTemplatePath = path.resolve(
			__dirname,
			'..',
			'views',
			'forgot_password.hbs'
		)

		await this.mailProvider.sendMail({
			to: {
				name: user.name,
				email: user.email,
			},
			subject: '[GoBarber] Recuperação de Senha',
			templateData: {
				file: forgotPasswordTemplatePath,
				variables: {
					name: user.name,
					link: `http://localhost:3000/reset_password?token=${token}`,
				},
			},
		})
	}
}

export default SendForgotPasswordEmailService
