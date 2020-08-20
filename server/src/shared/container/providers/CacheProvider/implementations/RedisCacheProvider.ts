import Redis, { Redis as RedisClient } from 'ioredis'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

import cacheConfig from '@config/cache'

class RedisCacheProvider implements ICacheProvider {
	private client: RedisClient

	constructor() {
		this.client = new Redis(cacheConfig.config.redis)
	}

	public async save(key: string, value: string) {
		await this.client.set(key, value)
	}

	public async recover(key: string) {
		const data = await this.client.get(key)

		return data
	}

	public async invalidate(key: string) {}
}

export default RedisCacheProvider
