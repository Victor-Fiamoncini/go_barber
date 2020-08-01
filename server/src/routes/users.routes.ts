import { Router } from 'express'

import CreateUserService from '../app/services/CreateUserService'

const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
	const { name, email, password } = request.body

	try {
		const user = await new CreateUserService().execute({
			name,
			email,
			password,
		})

		return response.status(201).json(user)
	} catch (err) {
		return response.status(400).json({ error: err.message })
	}
})

export default usersRouter
