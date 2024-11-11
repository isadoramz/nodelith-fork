import { Pet } from './pet.entity'

export class PetRepository {
  private readonly pet = new Map([
    ['123', { id: '123', name: 'Analu', specie: 'cat' }],
    ['234', { id: '234', name: 'Sig', specie: 'dog' }],
  ])

  public findPets(): Promise<Pet[]> {
    return Promise.resolve(Array.from(this.pet.values()))
  }

  public async findPetById(id: string): Promise<Pet | undefined> {
    return Promise.resolve(this.pet.get(id))
  }
}