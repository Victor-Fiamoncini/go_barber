import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'

class FakeStorageProvider implements IStorageProvider {
	private storage: string[] = []

	public async saveFile(file: string) {
		this.storage.push(file)

		return file
	}

	public async deleteFile(file: string) {
		const findIndex = this.storage.findIndex(file => file === file)

		this.storage.splice(findIndex, 1)
	}
}

export default FakeStorageProvider
