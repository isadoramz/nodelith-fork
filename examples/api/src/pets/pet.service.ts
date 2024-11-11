import { PetRepository } from './pet.repository'
import { Pet } from './pet.entity'

export class PetService {
  private readonly petRepository: PetRepository

  public constructor(dependencies: { petRepository: PetRepository }) {
    this.petRepository = dependencies.petRepository
  }

  public findPets(): Promise<Pet[]> {
    return this.petRepository.findPets()
  }

  public async findPetById(id: string): Promise<Pet | undefined> {
    return Promise.resolve(this.petRepository.findPetById(id))
  }
}