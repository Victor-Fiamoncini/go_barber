import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'

import './database'
import routes from './routes'
import uploadConfig from './app/config/upload'

import AppError from './app/errors/AppError'

const app = express()

app.use(express.json())
app.use(compression())
app.use(helmet())
app.use(morgan('dev'))
app.use(routes)
app.use('/files', express.static(uploadConfig.directory))
app.use(
	(err: Error, request: Request, response: Response, next: NextFunction) => {
		if (err instanceof AppError) {
			return response.status(err.statusCode).json({
				status: 'error',
				message: err.message,
			})
		}

		return response.status(500).json({
			status: 'error',
			message: 'Internal server error',
		})
	}
)

app.listen(3333, () => console.log('Server running 🚀'))
