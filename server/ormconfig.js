require('dotenv/config')

module.exports = [
	{
		name: 'default',
		type: 'postgres',
		host: process.env.SQL_HOST,
		port: Number(process.env.SQL_PORT),
		username: process.env.SQL_USER,
		password: process.env.SQL_PASS,
		database: process.env.SQL_DBNAME,
		entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
		migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
		cli: {
			migrations: ['./src/shared/infra/typeorm/migrations'],
		},
	},
	{
		name: 'mongo',
		type: 'mongodb',
		host: process.env.MONGO_HOST,
		port: Number(process.env.MONGO_PORT),
		database: process.env.MONGO_DBNAME,
		entities: ['./src/modules/**/infra/typeorm/schemas/*.ts'],
		useUnifiedTopology: true,
	},
]
