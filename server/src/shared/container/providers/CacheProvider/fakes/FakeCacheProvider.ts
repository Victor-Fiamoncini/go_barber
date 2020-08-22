import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

interface ICacheData {
	[key: string]: string
}

class FakeCacheProvider implements ICacheProvider {
	private cache: ICacheData = {}

	public async save(key: string, value: any) {
		this.cache[key] = JSON.stringify(value)
	}

	public async recover<T>(key: string) {
		const data = this.cache[key]

		if (!data) {
			return null
		}

		const parsedData = JSON.parse(data) as T

		return parsedData
	}

	public async invalidate(key: string) {
		delete this.cache[key]
	}

	public async invalidatePrefix(prefix: string) {
		Object.keys(this.cache)
			.filter(key => key.startsWith(`${prefix}:`))
			.forEach(key => {
				delete this.cache[key]
			})
	}
}

export default FakeCacheProvider
