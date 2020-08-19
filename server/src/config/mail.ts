interface IMailConfig {
	driver: 'ethereal' | 'mailtrap' | 'ses'
	defaults: {
		from: {
			email: string
			name: string
		}
	}
	host: string
	port: string
	user: string
	pass: string
}

export default {
	driver: process.env.MAIL_DRIVER || 'ethereal',
	defaults: {
		from: {
			email: 'gobarber@mail.com',
			name: 'Oi',
		},
	},
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	user: process.env.MAIL_USERNAME,
	pass: process.env.MAIL_PASSWORD,
} as IMailConfig
