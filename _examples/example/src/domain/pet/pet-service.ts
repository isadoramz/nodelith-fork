import { EntityProperties, EntityPropertiesToUpdate } from '@nodelith/context'
import { NotFoundError } from '@nodelith/http'
import { Pet } from '@example/domain'
import { PetRepository } from './pet-repository'

export class PetService {
  public constructor(
    private readonly petRepository: PetRepository
  ) {}

  public async getPets(): Promise<Pet[]> {
    return this.petRepository.getAll()
  }

  public async getPetById(id: string): Promise<Pet> {
    const pet = await this.petRepository.getById(id)

    if(!pet) {
      throw new NotFoundError(`Could not find pet by id ${id}`)
    }

    return pet
  }

  public async createPet(properties: EntityProperties<Pet>): Promise<Pet> {
    return this.petRepository.createOne(properties)
  }

  public async updatePetById(id: string, properties: EntityPropertiesToUpdate<Pet>): Promise<Pet> {
    return this.petRepository.updateById(id, properties)
  }

  public async deletePetById(id: string): Promise<void> {
    await this.petRepository.deleteById(id)
  }
}