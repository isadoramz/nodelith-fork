import { ConfigInitializerDefaults } from '@nodelith/config'
import { ApiConfig } from '@example/api'

export const configDefaults: ConfigInitializerDefaults<ApiConfig> = {
  serverConfig: {
    port: 3003,
    name: 'example-api',
  },
  mongodbConfig: {
    connectionTimeout: 1000,
    connectionString: 'mongodb://admin:admin@localhost:27017',
    databaseName: 'test-example',
  }
}
