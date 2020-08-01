import 'reflect-metadata'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'

import './database'
import routes from './routes'

const app = express()

app.use(express.json())
app.use(compression())
app.use(helmet())
app.use(morgan('dev'))
app.use(routes)

app.listen(3333, () => console.log('Server running 🚀'))
