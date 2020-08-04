import { hash, compare } from 'bcrypt'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'

class BCryptHashProvider implements IHashProvider {
	public async generateHash(payload: string) {
		return await hash(payload, 8)
	}

	public async compareHash(payload: string, hashed: string) {
		return await compare(payload, hashed)
	}
}

export default BCryptHashProvider
