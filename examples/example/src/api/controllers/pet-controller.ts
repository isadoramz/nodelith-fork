import { ControllerPath, DeleteRoute, GetRoute, PatchRoute, PostRoute } from '@nodelith/controller'
import { EntityProperties, EntityPropertiesToUpdate } from '@nodelith/context'
import { Pet, PetService } from '@example/domain'
import { PetDto, PetDtoConverter } from '@example/api'

@ControllerPath('/pets')
export class PetController {

  public constructor(
    private readonly petService: PetService
  ) {}

  @GetRoute('/:id')
  public async getPetById(id: string): Promise<PetDto> {
    const pet = await this.petService.getPetById(id)
    return PetDtoConverter.convert(pet)
  }

  @DeleteRoute('/:id')
  public async deletePetById(id: string): Promise<void> {
    return this.petService.deletePetById(id)
  }

  @PatchRoute('/:id')
  public async updatePetById(id: string, body: EntityPropertiesToUpdate<Pet>): Promise<PetDto> {
    const pet = await this.petService.updatePetById(id, body)
    return PetDtoConverter.convert(pet)
  }

  @PostRoute('/')
  public async createPet(body: EntityProperties<Pet>): Promise<PetDto> {
    const pet = await this.petService.createPet(body)
    return PetDtoConverter.convert(pet)
  }
}