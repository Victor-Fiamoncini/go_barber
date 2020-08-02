import { Router } from 'express'
import multer from 'multer'

import CreateUserService from '../app/services/CreateUserService'

import ensureAuthenticated from '../../app/middlewares/ensureAuthenticated'
import uploadConfig from '../../../../config/upload'
import UpdateUserAvatarService from '../../../../modules/users/services/UpdateUserAvatarService'

const usersRouter = Router()

const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
	const { name, email, password } = request.body

	const user = await new CreateUserService().execute({
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
		const user = await new UpdateUserAvatarService().execute({
			user_id: request.user.id,
			avatarFilename: request.file.filename,
		})

		delete user.password

		return response.status(200).json(user)
	}
)

export default usersRouter
