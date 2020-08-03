import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'

class UsersAvatarController {
	public async update(request: Request, response: Response) {
		const user = await container.resolve(UpdateUserAvatarService).execute({
			user_id: request.user.id,
			avatarFilename: request.file.filename,
		})

		delete user.password

		return response.status(200).json(user)
	}
}

export default UsersAvatarController
