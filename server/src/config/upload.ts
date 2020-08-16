import { diskStorage } from 'multer'
import { resolve } from 'path'
import { randomBytes } from 'crypto'

const tmpFolder = resolve(__dirname, '..', '..', 'tmp')

export default {
	tmpFolder,
	uploadFolder: resolve(tmpFolder, 'uploads'),
	storage: diskStorage({
		destination: tmpFolder,
		filename(request, file, callback) {
			const fileHash = randomBytes(10).toString('hex')
			const fileName = `${fileHash}-${file.originalname}`

			return callback(null, fileName)
		},
	}),
}
