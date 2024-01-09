import { Initializer } from '@nodelith/context';
import { RedisConfig } from './redis-config'
import { createClient } from 'redis'

export class RedisInitializer implements Initializer {
  public constructor(
    private readonly redisConfig: RedisConfig
  ) {}

  private getConnectionUrl() {
    const host = this.redisConfig.host
    const port = this.redisConfig.port
    const username = this.redisConfig.username
    const password = this.redisConfig.password

    if(username && password) {
      return `redis://${username}:${password}@${host}:${port}`
    }

    return `redis://${host}:${port}`
  }

  public async initialize() {
    const url = this.getConnectionUrl()

    const redisClient = createClient({ url })

    await redisClient.connect()

    return { redisClient }
  }
}