
import { Db } from 'mongodb'
import { Pet } from '@example/domain'
import { MongoRepository } from '@nodelith/mongodb'

export class MongodbPetRepository extends MongoRepository<Pet> {
  public static readonly COLLECTION_NAME = 'pets_collection'

  public constructor(mongodb: Db) {
    super(mongodb, MongodbPetRepository.COLLECTION_NAME)
  }
}