import { randomUUID } from 'crypto'
import { MongoClient,
  Db as MongoDatabase,
  Document as MongoDocument,
  Collection as MongoCollection,
} from 'mongodb'

import { MongoMemoryServer } from 'mongodb-memory-server'

export class MongoTestContext {

  public static readonly DATABASE_NAME = 'test-database'

  public static readonly MEMORY_SERVER: MongoMemoryServer = new MongoMemoryServer({ 
    instance: { dbName: MongoTestContext.DATABASE_NAME }
  })

  public static async startMemoryServer() {
    await MongoTestContext.MEMORY_SERVER.start()
  }

  public static async stopMemoryServer() {
    await MongoTestContext.MEMORY_SERVER.stop()
  }

  private client?: MongoClient

  private database?: MongoDatabase

  private collection?: MongoCollection

  public constructor(public readonly collectionName: string = randomUUID()) {}

  public async openConnection(): Promise<void> {
    await this.resolveClient().connect()
  }

  public async closeConnection(): Promise<void> {
    await this.resolveClient().close()
  }

  public async resetTestCollection(): Promise<void> {
    await this.resolveClient().db(MongoTestContext.DATABASE_NAME).collection(this.collectionName).deleteMany()
  }

  public async seedTestCollectionDocuments(entities: any[]) {
    return this.resolveCollection().insertMany(entities)
  }

  public async fetchTestCollectionDocuments(): Promise<MongoDocument[]> {
    return this.resolveCollection().find().toArray()
  }

  public resolveCollection() {
    if(!this.collection) {
      const database = this.resolveDatabase()
      this.collection = database.collection(this.collectionName)
    }

    return this.collection
  }

  public resolveDatabase() {
    if(!this.database) {
      const client = this.resolveClient()
      this.database = client.db(MongoTestContext.DATABASE_NAME)
    }

    return this.database
  }

  public resolveClient(): MongoClient {
    if(!this.client) {
      this.client = new MongoClient(MongoTestContext.MEMORY_SERVER.getUri())
    }
    
    return this.client;
  }
}
