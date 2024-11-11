import * as Controller from '@nodelith/controller'
import * as Http from '@nodelith/http'

import { PetService } from './pet.service'
import { Pet } from './pet.entity'

@Controller.Path('/pets')
export class PetController {
  private readonly petService: PetService

  public constructor(dependencies: { petService: PetService }) {
    this.petService = dependencies.petService
  }

  @Controller.Get('/')
  public findPets(): Promise<Pet[]> {
    return this.petService.findPets()
  }

  @Controller.Get('/:id')
  public async getPetById(id: string): Promise<Pet> {
    const pet = await this.petService.findPetById(id)

    if(!pet) {
      throw new Http.NotFoundError(`Could not find a matching Pet instance for ID "${id}".`)
    }

    return pet
  }
}
