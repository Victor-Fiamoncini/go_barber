import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'

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

		await this.mailProvider.sendMail({
			to: {
				name: user.name,
				email: user.email,
			},
			subject: '[GoBarber] Recuperação de Senha',
			templateData: {
				template: 'Olá, {{ name }}: {{ token }}',
				variables: {
					name: user.name,
					token,
				},
			},
		})
	}
}

export default SendForgotPasswordEmailService
