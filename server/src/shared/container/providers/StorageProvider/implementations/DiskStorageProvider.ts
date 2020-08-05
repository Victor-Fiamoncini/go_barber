import fs from 'fs'
import path from 'path'

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

import uploadConfig from '@config/upload'

class DiskStorageProvider implements IStorageProvider {
	public async saveFile(file: string) {
		await fs.promises.rename(
			path.resolve(uploadConfig.tmpFolder, file),
			path.resolve(uploadConfig.uploadFolder, file)
		)

		return file
	}

	public async deleteFile(file: string) {
		const filePath = path.resolve(uploadConfig.uploadFolder, file)

		try {
			await fs.promises.stat(filePath)
		} catch {
			return
		}

		await fs.promises.unlink(filePath)
	}
}

export default DiskStorageProvider
