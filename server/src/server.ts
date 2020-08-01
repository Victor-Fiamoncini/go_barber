import 'reflect-metadata'
import express from 'express'
import helmet from 'helmet'

import './database'
import routes from './routes'

const app = express()

app.use(helmet())
app.use(express.json())
app.use(routes)

app.listen(3333, () => console.log('Server running 🚀'))
