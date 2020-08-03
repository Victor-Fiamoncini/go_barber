import { Router } from 'express'
import multer from 'multer'

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

import CreateUserService from '@modules/users/services/CreateUserService'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import uploadConfig from '@config/upload'

const usersRouter = Router()

const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
	const usersRepository = new UsersRepository()

	const { name, email, password } = request.body

	const user = await new CreateUserService(usersRepository).execute({
		name,
		email,
		password,
	})

	delete user.password

	return response.status(201).json(user)
})

usersRouter.patch(
	'/avatar',
	ensureAuthenticated,
	upload.single('avatar'),
	async (request, response) => {
		const usersRepository = new UsersRepository()

		const user = await new UpdateUserAvatarService(usersRepository).execute({
			user_id: request.user.id,
			avatarFilename: request.file.filename,
		})

		delete user.password

		return response.status(200).json(user)
	}
)

export default usersRouter
