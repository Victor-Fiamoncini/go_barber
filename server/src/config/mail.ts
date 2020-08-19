interface IMailConfig {
	driver: 'ethereal' | 'mailtrap'
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
			email: 'equipe@gobarber.com.br',
			name: 'Equipe GoBarber',
		},
	},
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	user: process.env.MAIL_USERNAME,
	pass: process.env.MAIL_PASSWORD,
} as IMailConfig
