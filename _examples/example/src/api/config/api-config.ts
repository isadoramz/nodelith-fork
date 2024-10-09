import { ExpressConfig } from '@nodelith/express'
import { MongodbConfig } from '@nodelith/mongodb'

export type ApiConfig = {
  expressConfig: ExpressConfig
  mongodbConfig: MongodbConfig
}