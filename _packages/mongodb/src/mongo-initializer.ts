import * as Mongodb from 'mongodb'
import { Initializer } from '@nodelith/context'
import { MongodbConfig } from './mongo-config'

export class MongodbInitializer implements Initializer {
  private readonly client: Mongodb.MongoClient
  private readonly database: Mongodb.Db

  constructor(private readonly mongodbConfig: MongodbConfig) {
    const connectionString = this.mongodbConfig.connectionString
    const connectTimeoutMS = this.mongodbConfig.connectionTimeout
    this.client = new Mongodb.MongoClient(connectionString, { connectTimeoutMS })
    this.database = this.client.db(this.mongodbConfig.databaseName)
  }

  public async initialize(): Promise<{ mongodb: Mongodb.Db }> {
    await this.client.connect()
    return { mongodb: this.database }
  }

  public async terminate?(): Promise<void> {
    await this.client.close()
  }
}