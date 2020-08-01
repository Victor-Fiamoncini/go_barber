import { Router } from 'express'
import AuthenticateUserService from '../app/services/AuthenticateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
	const { email, password } = request.body

	try {
		const { user, token } = await new AuthenticateUserService().execute({
			email,
			password,
		})

		delete user.password

		return response.status(201).json({ user, token })
	} catch (err) {
		return response.status(400).json({ error: err.message })
	}
})

export default sessionsRouter
