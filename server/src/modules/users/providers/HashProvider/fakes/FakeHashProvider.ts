import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'

class FakeHashProvider implements IHashProvider {
	public async generateHash(payload: string) {
		return payload
	}

	public async compareHash(payload: string, hashed: string) {
		return payload === hashed
	}
}

export default FakeHashProvider
