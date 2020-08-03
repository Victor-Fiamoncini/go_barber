import { join } from 'path'
import fs from 'fs'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'

import AppError from '@shared/errors/AppError'
import uploadConfig from '@config/upload'

interface IRequest {
	user_id: string
	avatarFilename: string
}

class UpdateUserAvatarService {
	constructor(private usersRepository: IUsersRepository) {}

	public async execute({ user_id, avatarFilename }: IRequest) {
		const user = await this.usersRepository.findById(user_id)

		if (!user) {
			throw new AppError('Only authenticated users can change avatar', 401)
		}

		if (user.avatar) {
			const userAvatarFilePath = join(uploadConfig.directory, user.avatar)
			const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

			if (userAvatarFileExists) {
				await fs.promises.unlink(userAvatarFilePath)
			}
		}

		user.avatar = avatarFilename

		await this.usersRepository.save(user)

		return user
	}
}

export default UpdateUserAvatarService
