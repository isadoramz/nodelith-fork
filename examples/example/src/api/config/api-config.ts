import { MongodbConfig } from '@nodelith/mongodb'

export type ServerConfig = {
  port: number
  name: string
}

export type ApiConfig = {
  serverConfig: ServerConfig
  mongodbConfig: MongodbConfig
}