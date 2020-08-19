import { injectable, inject } from 'tsyringe'
import nodemailer, { Transporter } from 'nodemailer'

import mailConfig from '@config/mail'

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO'

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'

@injectable()
class MailtrapMailProvider implements IMailProvider {
	private client: Transporter

	constructor(
		@inject('MailTemplateProvider')
		private mailTemplateProvider: IMailTemplateProvider
	) {
		const { host, port, user, pass } = mailConfig

		const transporter = nodemailer.createTransport({
			host,
			port: Number(port),
			auth: {
				user,
				pass,
			},
		})

		this.client = transporter
	}

	public async sendMail({ to, from, subject, templateData }: ISendMailDTO) {
		const { defaults } = mailConfig

		await this.client.sendMail({
			from: {
				name: from?.name || defaults.from.name,
				address: from?.email || defaults.from.email,
			},
			to: {
				name: to.name,
				address: to.email,
			},
			subject,
			html: await this.mailTemplateProvider.parse(templateData),
		})
	}
}

export default MailtrapMailProvider
