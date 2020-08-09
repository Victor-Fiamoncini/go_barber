import { Request, Response } from 'express'
import { container } from 'tsyringe'

import UpdateProfileService from '@modules/users/services/UpdateProfileService'
import ShowProfileService from '@modules/users/services/ShowProfileService'

class ProfileController {
	public async show(request: Request, response: Response) {
		const user = await container
			.resolve(ShowProfileService)
			.execute({ user_id: request.user.id })

		delete user.password

		return response.status(200).json(user)
	}

	public async update(request: Request, response: Response) {
		const { name, email, password, old_password } = request.body

		const user = await container.resolve(UpdateProfileService).execute({
			user_id: request.user.id,
			name,
			email,
			password,
			old_password,
		})

		delete user.password

		return response.status(200).json(user)
	}
}

export default ProfileController
