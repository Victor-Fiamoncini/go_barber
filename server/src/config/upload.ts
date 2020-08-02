import { diskStorage } from 'multer'
import { resolve } from 'path'
import { randomBytes } from 'crypto'

const tempFolder = resolve(__dirname, '..', '..', '..', 'tmp', 'uploads')

export default {
	directory: tempFolder,
	storage: diskStorage({
		destination: tempFolder,
		filename(req, file, callback) {
			const fileHash = randomBytes(10).toString('hex')
			const fileName = `${fileHash}-${file.originalname}`

			return callback(null, fileName)
		},
	}),
}
