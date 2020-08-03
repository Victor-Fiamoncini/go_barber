import { getRepository } from 'typeorm'
import { join } from 'path'
import fs from 'fs'

import User from '@modules/users/infra/typeorm/entities/User'
import AppError from '@shared/errors/AppError'

import uploadConfig from '@config/upload'

interface Request {
	user_id: string
	avatarFilename: string
}

class UpdateUserAvatarService {
	public async execute({ user_id, avatarFilename }: Request) {
		const usersRepository = getRepository(User)

		const user = await usersRepository.findOne(user_id)

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

		await usersRepository.save(user)

		return user
	}
}

export default UpdateUserAvatarService
