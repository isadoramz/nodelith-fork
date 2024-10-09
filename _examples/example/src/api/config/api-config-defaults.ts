import { ConfigInitializerDefaults } from '@nodelith/config'
import { ApiConfig } from '@example/api'

export const configDefaults: ConfigInitializerDefaults<ApiConfig> = {
  expressConfig: {
    serverPort: 3003,
    serverName: 'pet-api',
  },
  mongodbConfig: {
    connectionTimeout: 1000,
    connectionString: 'mongodb://admin:admin@localhost:27017',
    databaseName: 'test-example',
  }
}
