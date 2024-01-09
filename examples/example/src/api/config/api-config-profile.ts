import { ConfigInitializerProfile } from '@nodelith/config'
import { number, string } from '@nodelith/joi'
import { ApiConfig } from '@example/api'

export const configProfile: ConfigInitializerProfile<ApiConfig> = {
  serverConfig: {
    port: ['SERVER_PORT', number()],
    name: ['SERVER_NAME', string()],
  },
  mongodbConfig: {
    databaseName: ['MONGODB_DATABASE_NAME', string()],
    connectionString: ['MONGODB_CONNECTION_STRING', string()],
    connectionTimeout: ['MONGODB_CONNECTION_TIMEOUT', number()],
  },
}
